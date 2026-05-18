import type { BabelFileResult } from '@babel/core';

type TranspileResult = { code: string } | { error: string };

export async function transpileJSX(source: string): Promise<TranspileResult> {
  const Babel = await import('@babel/standalone');
  let result: BabelFileResult;
  try {
    result = Babel.transform(source, {
      presets: ['react'],
      filename: 'puzzle.jsx',
    });
  } catch (e) {
    return { error: (e as Error).message };
  }
  return { code: result.code ?? '' };
}
