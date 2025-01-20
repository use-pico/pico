import {
  createFileRoute,
  Outlet,
  useRouteContext,
} from '@tanstack/react-router'
import { withFetch } from '@use-pico/client'
import { z } from 'zod'
import { BlueprintIndexMenu } from '~/app/derivean/game/BlueprintIndexMenu'
import { BlueprintPreview } from '~/app/derivean/game/BlueprintPreview'
import { withBlueprintGraph } from '~/app/derivean/utils/withBlueprintGraph'

export const Route = createFileRoute(
  '/$locale/apps/derivean/game/blueprint/$id',
)({
  async loader({ context: { queryClient, kysely }, params: { id } }) {
    const entity = await queryClient.ensureQueryData({
      queryKey: ['Blueprint', 'fetch', id],
      async queryFn() {
        return kysely.transaction().execute(async (tx) => {
          return withFetch({
            select: tx
              .selectFrom('Blueprint as bl')
              .select(['bl.id', 'bl.name', 'bl.cycles'])
              .where('bl.id', '=', id)
              .orderBy('bl.name', 'asc'),
            query({ select, where }) {
              let $select = select

              if (where?.fulltext) {
                const fulltext = `%${where.fulltext}%`.toLowerCase()
                $select = $select.where((eb) => {
                  return eb.or([
                    eb('bl.id', 'like', fulltext),
                    eb('bl.name', 'like', fulltext),
                    eb(
                      'bl.id',
                      'in',
                      eb
                        .selectFrom('Blueprint_Requirement as br')
                        .innerJoin('Resource as r', 'r.id', 'br.resourceId')
                        .select('br.blueprintId')
                        .where((eb) => {
                          return eb.or([eb('r.name', 'like', fulltext)])
                        }),
                    ),
                    eb(
                      'bl.id',
                      'in',
                      eb
                        .selectFrom('Blueprint_Dependency as bd')
                        .innerJoin('Blueprint as b', 'b.id', 'bd.dependencyId')
                        .select('bd.blueprintId')
                        .where((eb) => {
                          return eb.or([eb('b.name', 'like', fulltext)])
                        }),
                    ),
                  ])
                })
              }

              return $select
            },
            output: z.object({
              id: z.string().min(1),
              name: z.string().min(1),
              cycles: z.number().nonnegative(),
            }),
          })
        })
      },
    })

    return {
      entity,
      graph: await kysely.transaction().execute(async (tx) => {
        return withBlueprintGraph({ tx })
      }),
    }
  },
  component() {
    const { tva } = useRouteContext({ from: '__root__' })
    const { entity } = Route.useLoaderData()
    const tv = tva().slots

    return (
      <div className={tv.base()}>
        <BlueprintPreview entity={entity} />

        <BlueprintIndexMenu entity={entity} />

        <Outlet />
      </div>
    )
  },
})
