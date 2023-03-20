import {WorkerFarmOptions} from 'jest-worker';
import serialize from 'serialize-javascript';
import type {PluginImpl} from "rollup";
import {NormalizedOutputOptions, RenderedChunk} from "rollup";
import {transform} from "./transform";

interface UglifyProps extends Partial<Pick<WorkerFarmOptions, 'numWorkers' | 'maxRetries'>> {
}

export const uglify: PluginImpl<UglifyProps> = (userOptions: UglifyProps = {}) => {
    const minifierOptions = serialize(userOptions);

    return {
        name: "uglify",
        renderChunk: async (code: string, chunk: RenderedChunk, options: NormalizedOutputOptions, meta: { chunks: Record<string, RenderedChunk> }) => {
            return transform(code, minifierOptions);
        },
    };
}
