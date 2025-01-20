import dagre from '@dagrejs/dagre'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { withList } from '@use-pico/client'
import { Kysely } from '@use-pico/common'
import { z } from 'zod'
import { GameMap } from '~/app/derivean/game/GameMap'
import { MapSchema } from '~/app/derivean/game/GameMap/MapSchema'
import { withLayout } from '~/app/derivean/utils/withLayout'

export const Route = createFileRoute('/$locale/apps/derivean/game/')({
  validateSearch: zodValidator(
    z.object({
      blueprintId: z.string().optional(),
      requirementsOf: z.string().optional(),
    }),
  ),
  loaderDeps({ search: { blueprintId, requirementsOf } }) {
    return {
      blueprintId,
      requirementsOf,
    }
  },
  async loader({ context: { queryClient, kysely, session } }) {
    const user = await session()

    const data = await queryClient.ensureQueryData({
      queryKey: ['Management', user.id],
      async queryFn() {
        const data = await kysely.transaction().execute(async (tx) => {
          const data = await withList({
            select: tx
              .selectFrom(
                tx
                  .selectFrom('Blueprint as bl')
                  .leftJoin('Building as bg', 'bg.blueprintId', 'bl.id')
                  .select([
                    'bl.id',
                    'bl.name',
                    'bl.cycles',
                    'bl.sort',
                    (eb) => {
                      return eb
                        .case()
                        .when(
                          eb.not(
                            eb.exists(
                              eb
                                .selectFrom('Blueprint_Requirement as br')
                                .select(eb.lit(1).as('one'))
                                .whereRef('br.blueprintId', '=', 'bl.id')
                                .where((eb) =>
                                  eb.not(
                                    eb.exists(
                                      eb
                                        .selectFrom('Inventory as i')
                                        .select(eb.lit(1).as('one'))
                                        .where(
                                          'i.id',
                                          'in',
                                          eb
                                            .selectFrom('User_Inventory')
                                            .select('inventoryId')
                                            .where('userId', '=', user.id),
                                        )
                                        .whereRef(
                                          'i.resourceId',
                                          '=',
                                          'br.resourceId',
                                        )
                                        .whereRef(
                                          'i.amount',
                                          '>=',
                                          'br.amount',
                                        ),
                                    ),
                                  ),
                                ),
                            ),
                          ),
                        )
                        .then(eb.lit(true))
                        .else(eb.lit(false))
                        .end()
                        .as('withAvailableResources')
                    },
                    (eb) => {
                      return eb
                        .case()
                        .when(
                          eb.not(
                            eb.exists(
                              eb
                                .selectFrom('Blueprint_Dependency as bd')
                                .select(eb.lit(1).as('one'))
                                .whereRef('bd.blueprintId', '=', 'bl.id')
                                .where((eb) =>
                                  eb.not(
                                    eb.exists(
                                      eb
                                        .selectFrom('Building as b')
                                        .select(eb.lit(1).as('one'))
                                        .where('b.userId', '=', user.id)
                                        .whereRef(
                                          'b.blueprintId',
                                          '=',
                                          'bd.dependencyId',
                                        ),
                                    ),
                                  ),
                                ),
                            ),
                          ),
                        )
                        .then(eb.lit(true))
                        .else(eb.lit(false))
                        .end()
                        .as('withAvailableBuildings')
                    },
                    (eb) =>
                      eb
                        .selectFrom('Building as bg')
                        .select((eb) => {
                          return Kysely.jsonObject({
                            id: eb.ref('bg.id'),
                          }).as('building')
                        })
                        .whereRef('bg.blueprintId', '=', 'bl.id')
                        .where('bg.userId', '=', user.id)
                        .as('building'),
                    (eb) =>
                      eb
                        .case()
                        .when(
                          eb.exists(
                            eb
                              .selectFrom('Production as p')
                              .select(eb.lit(1).as('one'))
                              .where(
                                'p.blueprintProductionId',
                                'in',
                                eb
                                  .selectFrom('Blueprint_Production')
                                  .select('id')
                                  .whereRef('blueprintId', '=', 'bl.id'),
                              )
                              .groupBy('p.blueprintProductionId')
                              .having((eb) => {
                                return eb(eb.fn.count('p.id'), '>=', 0)
                              }),
                          ),
                        )
                        .then(eb.lit(false))
                        .else(eb.lit(true))
                        .end()
                        .as('productionAvailable'),
                    (eb) =>
                      eb
                        .selectFrom('Blueprint_Requirement as br')
                        .innerJoin('Resource as r', 'r.id', 'br.resourceId')
                        .select((eb) => {
                          return Kysely.jsonGroupArray({
                            id: eb.ref('br.id'),
                            amount: eb.ref('br.amount'),
                            passive: eb.ref('br.passive'),
                            resourceId: eb.ref('br.resourceId'),
                            blueprintId: eb.ref('br.blueprintId'),
                            name: eb.ref('r.name'),
                          }).as('requirements')
                        })
                        .whereRef('br.blueprintId', '=', 'bl.id')
                        .orderBy('r.name', 'asc')
                        .as('requirements'),
                    (eb) =>
                      eb
                        .selectFrom('Blueprint_Dependency as bd')
                        .innerJoin(
                          'Blueprint as bl2',
                          'bl2.id',
                          'bd.dependencyId',
                        )
                        .select((eb) => {
                          return Kysely.jsonGroupArray({
                            id: eb.ref('bd.id'),
                            dependencyId: eb.ref('bd.dependencyId'),
                            blueprintId: eb.ref('bd.blueprintId'),
                            name: eb.ref('bl2.name'),
                          }).as('requirements')
                        })
                        .whereRef('bd.blueprintId', '=', 'bl.id')
                        .orderBy('bl2.name', 'asc')
                        .as('dependencies'),
                    (eb) =>
                      eb
                        .selectFrom('Construction as c')
                        .innerJoin(
                          'Blueprint as bl2',
                          'bl2.id',
                          'c.blueprintId',
                        )
                        .select((eb) => {
                          return Kysely.jsonGroupArray({
                            id: eb.ref('c.id'),
                            cycle: eb.ref('c.cycle'),
                            from: eb.ref('c.from'),
                            to: eb.ref('c.to'),
                            name: eb.ref('bl2.name'),
                          }).as('requirements')
                        })
                        .whereRef('c.blueprintId', '=', 'bl.id')
                        .where('c.userId', '=', user.id)
                        .orderBy('bl2.name', 'asc')
                        .as('construction'),
                    (eb) =>
                      eb
                        .selectFrom('Blueprint_Production as bp')
                        .innerJoin('Resource as r', 'r.id', 'bp.resourceId')
                        .leftJoin('Building as b', (eb) => {
                          return eb
                            .onRef('b.blueprintId', '=', 'bp.blueprintId')
                            .on('b.userId', '=', user.id)
                        })
                        .where((eb) => {
                          return eb.not(
                            eb.exists(
                              eb
                                .selectFrom(
                                  'Blueprint_Production_Dependency as bpd',
                                )
                                .select('bpd.blueprintProductionId')
                                .whereRef(
                                  'bpd.blueprintProductionId',
                                  '=',
                                  'bp.id',
                                )
                                .where((eb) => {
                                  return eb.not(
                                    eb.exists(
                                      eb
                                        .selectFrom('Building as b')
                                        .select('b.blueprintId')
                                        .where('b.userId', '=', user.id)
                                        .whereRef(
                                          'b.blueprintId',
                                          '=',
                                          'bpd.blueprintId',
                                        ),
                                    ),
                                  )
                                }),
                            ),
                          )
                        })
                        .where((eb) => {
                          return eb.not(
                            eb.exists(
                              eb
                                .selectFrom(
                                  'Blueprint_Production_Resource as bpr',
                                )
                                .select('bpr.blueprintProductionId')
                                .whereRef(
                                  'bpr.blueprintProductionId',
                                  '=',
                                  'bp.id',
                                )
                                .where((eb) => {
                                  return eb.not(
                                    eb.exists(
                                      eb
                                        .selectFrom('Inventory as i')
                                        .select('i.resourceId')
                                        .where(
                                          'i.id',
                                          'in',
                                          eb
                                            .selectFrom('User_Inventory')
                                            .select('inventoryId')
                                            .where('userId', '=', user.id),
                                        )
                                        .whereRef(
                                          'i.resourceId',
                                          '=',
                                          'bpr.resourceId',
                                        )
                                        .whereRef(
                                          'i.amount',
                                          '>=',
                                          'bpr.amount',
                                        ),
                                    ),
                                  )
                                }),
                            ),
                          )
                        })
                        .select((eb) => {
                          return Kysely.jsonGroupArray({
                            id: eb.ref('bp.id'),
                            amount: eb.ref('bp.amount'),
                            cycles: eb.ref('bp.cycles'),
                            buildingId: eb.ref('b.id'),
                            blueprintId: eb.ref('bp.blueprintId'),
                            resourceId: eb.ref('bp.resourceId'),
                            name: eb.ref('r.name'),
                            isFull: eb
                              .case()
                              .when(
                                eb.exists(
                                  eb
                                    .selectFrom('Production as p')
                                    .select(eb.lit(1).as('one'))
                                    .whereRef(
                                      'p.blueprintProductionId',
                                      '=',
                                      'bp.id',
                                    )
                                    .groupBy('p.blueprintProductionId')
                                    .having((eb) => {
                                      return eb(eb.fn.count('p.id'), '>=', 0)
                                    }),
                                ),
                              )
                              .then(eb.lit(true))
                              .else(eb.lit(false))
                              .end(),
                            inQueue: eb
                              .case()
                              .when(
                                eb.exists(
                                  eb
                                    .selectFrom('Production_Queue as pq')
                                    .select(eb.lit(1).as('one'))
                                    .whereRef(
                                      'pq.blueprintProductionId',
                                      '=',
                                      'bp.id',
                                    )
                                    .groupBy('pq.blueprintProductionId')
                                    .having((eb) => {
                                      return eb(eb.fn.count('pq.id'), '>=', 0)
                                    }),
                                ),
                              )
                              .then(eb.lit(true))
                              .else(eb.lit(false))
                              .end(),
                            withAvailableResources: eb
                              .case()
                              .when(
                                eb.not(
                                  eb.exists(
                                    eb
                                      .selectFrom(
                                        'Blueprint_Production_Requirement as bpr',
                                      )
                                      .select(eb.lit(1).as('one'))
                                      .whereRef(
                                        'bpr.blueprintProductionId',
                                        '=',
                                        'bp.id',
                                      )
                                      .where((eb) =>
                                        eb.not(
                                          eb.exists(
                                            eb
                                              .selectFrom('Inventory as i')
                                              .select(eb.lit(1).as('one'))
                                              .where(
                                                'i.id',
                                                'in',
                                                eb
                                                  .selectFrom('User_Inventory')
                                                  .select('inventoryId')
                                                  .where(
                                                    'userId',
                                                    '=',
                                                    user.id,
                                                  ),
                                              )
                                              .whereRef(
                                                'i.resourceId',
                                                '=',
                                                'bpr.resourceId',
                                              )
                                              .whereRef(
                                                'i.amount',
                                                '>=',
                                                'bpr.amount',
                                              ),
                                          ),
                                        ),
                                      ),
                                  ),
                                ),
                              )
                              .then(eb.lit(true))
                              .else(eb.lit(false))
                              .end(),
                            requirements: eb
                              .selectFrom(
                                'Blueprint_Production_Requirement as bpr',
                              )
                              .innerJoin(
                                'Resource as r2',
                                'r2.id',
                                'bpr.resourceId',
                              )
                              .select([
                                (eb) => {
                                  return Kysely.jsonGroupArray({
                                    id: eb.ref('bpr.id'),
                                    amount: eb.ref('bpr.amount'),
                                    passive: eb.ref('bpr.passive'),
                                    name: eb.ref('r2.name'),
                                    blueprintId: eb.ref('bp.id'),
                                    resourceId: eb.ref('bpr.resourceId'),
                                  }).as('requirements')
                                },
                              ])
                              .whereRef(
                                'bpr.blueprintProductionId',
                                '=',
                                'bp.id',
                              ),
                            queue: eb
                              .selectFrom('Production as p')
                              .innerJoin(
                                'Blueprint_Production as bp2',
                                'p.blueprintProductionId',
                                'bp2.id',
                              )
                              .innerJoin(
                                'Resource as r2',
                                'r2.id',
                                'bp.resourceId',
                              )
                              .select((eb) => {
                                return Kysely.jsonGroupArray({
                                  id: eb.ref('p.id'),
                                  name: eb.ref('r2.name'),
                                  from: eb.ref('p.from'),
                                  to: eb.ref('p.to'),
                                  cycle: eb.ref('p.cycle'),
                                  blueprintProductionId: eb.ref(
                                    'p.blueprintProductionId',
                                  ),
                                }).as('requirements')
                              })
                              .whereRef('p.blueprintProductionId', '=', 'bp.id')
                              .where('p.id', 'in', (eb) => {
                                return eb
                                  .selectFrom('Production')
                                  .select('id')
                                  .where('userId', '=', user.id)
                              }),
                          }).as('production')
                        })
                        .whereRef('bp.blueprintId', '=', 'bl.id')
                        .where((eb) => {
                          return eb.or([
                            eb(
                              'bp.resourceId',
                              'in',
                              eb
                                .selectFrom(
                                  eb
                                    .selectFrom('Blueprint_Requirement as br')
                                    .innerJoin(
                                      'Blueprint as bl2',
                                      'bl2.id',
                                      'br.blueprintId',
                                    )
                                    .select([
                                      'br.resourceId',
                                      (eb) => {
                                        return eb
                                          .case()
                                          .when(
                                            eb.not(
                                              eb.exists(
                                                eb
                                                  .selectFrom(
                                                    'Blueprint_Dependency as bd',
                                                  )
                                                  .select(eb.lit(1).as('one'))
                                                  .whereRef(
                                                    'bd.blueprintId',
                                                    '=',
                                                    'bl2.id',
                                                  )
                                                  .where((eb) =>
                                                    eb.not(
                                                      eb.exists(
                                                        eb
                                                          .selectFrom(
                                                            'Building as b',
                                                          )
                                                          .select(
                                                            eb.lit(1).as('one'),
                                                          )
                                                          .where(
                                                            'b.userId',
                                                            '=',
                                                            user.id,
                                                          )
                                                          .whereRef(
                                                            'b.blueprintId',
                                                            '=',
                                                            'bd.dependencyId',
                                                          ),
                                                      ),
                                                    ),
                                                  ),
                                              ),
                                            ),
                                          )
                                          .then(eb.lit(true))
                                          .else(eb.lit(false))
                                          .end()
                                          .as('withAvailableBuildings')
                                      },
                                      (eb) => {
                                        return eb
                                          .case()
                                          .when(
                                            eb.not(
                                              eb.exists(
                                                eb
                                                  .selectFrom(
                                                    'Blueprint_Requirement as br',
                                                  )
                                                  .select(eb.lit(1).as('one'))
                                                  .whereRef(
                                                    'br.blueprintId',
                                                    '=',
                                                    'bl2.id',
                                                  )
                                                  .where((eb) =>
                                                    eb.not(
                                                      eb.exists(
                                                        eb
                                                          .selectFrom(
                                                            'Inventory as i',
                                                          )
                                                          .select(
                                                            eb.lit(1).as('one'),
                                                          )
                                                          .where(
                                                            'i.id',
                                                            'in',
                                                            eb
                                                              .selectFrom(
                                                                'User_Inventory',
                                                              )
                                                              .select(
                                                                'inventoryId',
                                                              )
                                                              .where(
                                                                'userId',
                                                                '=',
                                                                user.id,
                                                              ),
                                                          )
                                                          .whereRef(
                                                            'i.resourceId',
                                                            '=',
                                                            'br.resourceId',
                                                          )
                                                          .whereRef(
                                                            'i.amount',
                                                            '>=',
                                                            'br.amount',
                                                          ),
                                                      ),
                                                    ),
                                                  ),
                                              ),
                                            ),
                                          )
                                          .then(eb.lit(true))
                                          .else(eb.lit(false))
                                          .end()
                                          .as('withAvailableResources')
                                      },
                                    ])
                                    .where(
                                      'br.blueprintId',
                                      'not in',
                                      eb
                                        .selectFrom('Building as bg2')
                                        .where('bg2.userId', '=', user.id)
                                        .select('bg2.blueprintId'),
                                    )
                                    .where(
                                      'br.blueprintId',
                                      'not in',
                                      eb
                                        .selectFrom('Construction as c')
                                        .where('c.userId', '=', user.id)
                                        .select('c.blueprintId'),
                                    )
                                    .where((eb) => {
                                      const inventory = tx
                                        .selectFrom('Inventory as i')
                                        .innerJoin(
                                          'User_Inventory as ui',
                                          'ui.inventoryId',
                                          'i.id',
                                        )
                                        .select('i.amount')
                                        .where('ui.userId', '=', user.id)
                                        .where(
                                          'i.resourceId',
                                          '=',
                                          'br.resourceId',
                                        )

                                      return eb.or([
                                        eb('br.amount', '>', inventory),
                                        eb(inventory, 'is', null),
                                      ])
                                    })
                                    .as('resources'),
                                )
                                .select('resources.resourceId')
                                .where(
                                  'resources.withAvailableBuildings',
                                  '=',
                                  true,
                                )
                                .where(
                                  'resources.withAvailableResources',
                                  '=',
                                  false,
                                ),
                            ),
                            eb(
                              'bp.resourceId',
                              'in',
                              eb
                                .selectFrom(
                                  'Blueprint_Production_Requirement as bpr',
                                )
                                .innerJoin(
                                  'Blueprint_Production as bp',
                                  'bp.id',
                                  'bpr.blueprintProductionId',
                                )
                                .where(
                                  'bp.blueprintId',
                                  'in',
                                  eb
                                    .selectFrom('Building as bg2')
                                    .select('bg2.blueprintId')
                                    .where('bg2.userId', '=', user.id),
                                )
                                .select(['bpr.resourceId']),
                            ),
                          ])
                        })
                        .orderBy('r.name', 'asc')
                        .as('production'),
                  ])
                  .where(
                    'bl.id',
                    'not in',
                    tx
                      .selectFrom('Blueprint_Conflict as bc')
                      .select('bc.conflictId')
                      .where(
                        'bc.blueprintId',
                        'in',
                        tx
                          .selectFrom('Building as bg')
                          .select('bg.blueprintId')
                          .where('bg.userId', '=', user.id),
                      ),
                  )
                  .where(
                    'bl.id',
                    'not in',
                    tx
                      .selectFrom('Blueprint_Conflict as bc')
                      .select('bc.conflictId')
                      .where(
                        'bc.blueprintId',
                        'in',
                        tx
                          .selectFrom('Construction as c')
                          .select('c.blueprintId')
                          .where('c.userId', '=', user.id),
                      ),
                  )
                  .as('blueprint'),
              )
              .selectAll()
              .where('withAvailableBuildings', '=', true)
              .orderBy('sort', 'asc')
              .orderBy('name', 'asc'),
            query({ select, where }) {
              let $select = select

              if (where?.fulltext) {
                const fulltext = `%${where.fulltext}%`.toLowerCase()
                $select = $select.where((eb) => {
                  return eb.or([
                    eb('id', 'like', fulltext),
                    eb('name', 'like', fulltext),
                    eb(
                      'id',
                      'in',
                      eb
                        .selectFrom('Blueprint_Production as bp')
                        .innerJoin('Resource as r', 'r.id', 'bp.resourceId')
                        .select('bp.blueprintId')
                        .where((eb) => {
                          return eb.or([eb('r.name', 'like', fulltext)])
                        }),
                    ),
                  ])
                })
              }

              return $select
            },
            output: MapSchema,
            cursor: {
              page: 0,
              /**
               * List max. of 250 buildings
               */
              size: 250,
            },
          })

          // console.log(data);

          return data
        })

        return data
      },
    })

    return {
      graph: withLayout({
        graph: new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({})),
        nodes: data.map((data) => {
          let type = 'blueprint'

          if (data.construction?.[0]) {
            type = 'construction'
          } else if (data.building) {
            type = 'building'
          } else if (
            data.withAvailableResources &&
            data.withAvailableBuildings
          ) {
            type = 'blueprint-available'
          } else if (
            data.withAvailableResources &&
            !data.withAvailableBuildings
          ) {
            type = 'blueprint-missing-buildings'
          } else if (
            data.withAvailableBuildings &&
            !data.withAvailableResources
          ) {
            type = 'blueprint-missing-resources'
          } else if (
            !data.withAvailableBuildings &&
            !data.withAvailableResources
          ) {
            type = 'blueprint-unavailable'
          }

          return {
            id: data.id,
            data,
            position: { x: 0, y: 0 },
            type,
          }
        }),
        edges: (
          await kysely
            .selectFrom('Blueprint_Dependency')
            .select(['id', 'blueprintId', 'dependencyId'])
            .execute()
        ).map(({ id, blueprintId, dependencyId }) => {
          return {
            id,
            source: dependencyId,
            target: blueprintId,
            // type: "dependency",
          }
        }),
      }),
      inventory: await kysely
        .selectFrom('Inventory as i')
        .innerJoin('User_Inventory as ui', 'ui.inventoryId', 'i.id')
        .select(['i.id', 'i.amount', 'i.resourceId', 'i.limit'])
        .where('ui.userId', '=', user.id)
        .execute(),
    }
  },
  component() {
    const { graph, inventory } = Route.useLoaderData()
    const { blueprintId, requirementsOf } = Route.useSearch()
    const { session } = useLoaderData({
      from: '/$locale/apps/derivean/game',
    })

    return (
      <GameMap
        graph={graph}
        userId={session.id}
        inventory={inventory}
        blueprintId={blueprintId}
        requirementsOf={requirementsOf}
      />
    )
  },
})
