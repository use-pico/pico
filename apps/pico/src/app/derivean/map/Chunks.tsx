import { Timer } from "@use-pico/common";
import { FC, useEffect, useState } from "react";
import { DataArrayTexture, GLSL3, ShaderMaterial } from "three";
import { Game } from "~/app/derivean/Game";
import { decompressChunk } from "~/app/derivean/service/decompressChunk";
import type { Chunk } from "~/app/derivean/type/Chunk";
import type { ChunkHash } from "~/app/derivean/type/ChunkHash";
import { GameWorkerLoader } from "~/app/derivean/worker/GameWorkerLoader";

export namespace Chunks {
	export interface Config {
		chunkSize: number;
		plotCount: number;
		plotSize: number;
	}

	export interface Props {
		mapId: string;
		config: Config;
		hash?: ChunkHash;
	}
}

export const Chunks: FC<Chunks.Props> = ({ mapId, config, hash }) => {
	const [chunks, setChunks] = useState<{ chunk: Chunk.Lightweight }[]>([]);
	const [textures, setTextures] = useState<DataArrayTexture>();

	useEffect(() => {
		if (!hash) {
			return;
		}

		const timer = new Timer();
		timer.start();
		console.log(`[Chunks] Requesting chunks [${hash.count}] ${hash.hash}`);

		GameWorkerLoader.generator({
			mapId,
			seed: mapId,
			hash,
		}).then((chunks) => {
			console.log(`[Chunks] - Received chunks ${timer.format()}`);

			const chunkTimer = new Timer();
			chunkTimer.start();

			Promise.all(
				chunks.map(async (chunk) => {
					return new Promise<{ chunk: Chunk.Lightweight; texture: Uint8Array }>(
						(resolve) => {
							setTimeout(() => {
								const { tiles: _, ...$chunk } = decompressChunk(chunk);
								resolve({
									chunk: $chunk,
									texture: new Uint8Array($chunk.texture.data),
								});
							}, 0);
						},
					);
				}),
			).then((chunks) => {
				setTimeout(() => {
					const size = Game.plotCount ** 2 * 4;
					const textureArrayBuffer = new Uint8Array(size * chunks.length);

					chunks.forEach((chunk, index) => {
						textureArrayBuffer.set(chunk.texture, index * size);
					});

					const texture = new DataArrayTexture(
						textureArrayBuffer,
						Game.plotCount,
						Game.plotCount,
						chunks.length,
					);
					texture.needsUpdate = true;

					console.log(
						`[Chunks] - done ${timer.format()}; chunk processing ${chunkTimer.format()}`,
					);

					setTextures(texture);
					setChunks(chunks);
				}, 0);
			});
		});
	}, [hash, mapId]);

	return (
		<>
			<mesh position={[config.plotSize / 2, 0, config.plotSize / 2]}>
				<boxGeometry args={[config.plotSize, 1, config.plotSize]} />
			</mesh>

			{textures &&
				chunks.map(({ chunk }, index) => (
					<mesh
						key={`chunk-${chunk.id}`}
						position={[
							chunk.x * config.chunkSize * 1.001,
							-1,
							chunk.z * config.chunkSize * 1.001,
						]}
						rotation={[-Math.PI / 2, 0, 0]}
						receiveShadow
					>
						<planeGeometry args={[config.chunkSize, config.chunkSize]} />
						<primitive
							object={
								new ShaderMaterial({
									glslVersion: GLSL3,
									uniforms: {
										uTextureArray: { value: textures },
										uLayer: { value: index },
									},
									vertexShader: `
									    varying vec2 vUv;
									    void main() {
									        vUv = uv;
									        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
									    }
									`,
									fragmentShader: `
                                        precision highp float;
                                        uniform sampler2DArray uTextureArray;
                                        uniform float uLayer;
                                        varying vec2 vUv;
                                        out vec4 fragColor;
                                        void main() {
                                            fragColor = texture(uTextureArray, vec3(vUv, uLayer));
                                        }
                                    `,
								})
							}
							attach={"material"}
						/>
					</mesh>
				))}
		</>
	);
};
