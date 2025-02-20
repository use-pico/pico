import { Timer } from "@use-pico/common";
import { FC, useEffect, useState } from "react";
import {
    DataArrayTexture,
    GLSL3,
    RGBAFormat,
    ShaderMaterial,
    UnsignedByteType,
} from "three";
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
					const { tiles: _, ...$chunk } = decompressChunk(chunk);
					return {
						chunk: $chunk,
						texture: new Uint8Array($chunk.texture.data),
					};
				}),
			).then((chunks) => {
				const layerCount = chunks.length;
				const texSize = Game.plotCount;
				const layerPixels = texSize * texSize * 4;
				const totalSize = layerPixels * layerCount;
				const textureArrayBuffer = new Uint8Array(totalSize);

				chunks.forEach((chunk, index) => {
					textureArrayBuffer.set(chunk.texture, index * layerPixels);
				});

				const texture = new DataArrayTexture(
					textureArrayBuffer,
					texSize,
					texSize,
					layerCount,
				);
				texture.format = RGBAFormat;
				texture.type = UnsignedByteType;
				texture.needsUpdate = true;

				console.log(
					`[Chunks] - done ${timer.format()}; chunk processing ${chunkTimer.format()}`,
				);

				setTextures(texture);
				setChunks(chunks);
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
