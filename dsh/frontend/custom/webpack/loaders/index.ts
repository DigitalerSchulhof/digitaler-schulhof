import ts from 'typescript';
import { LoaderDefinitionFunction } from 'webpack';
import { transformerFactory as transformFactoryI18n } from './i18n';
import { transformerFactory as transformFactoryShell } from './shell';

interface Options {
  isDev: boolean;
}

export type DshTransformerFactory = (options: {
  options: Options;
  addDependency: (file: string) => void;
}) => ts.TransformerFactory<ts.SourceFile>;

// Create a Printer
const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
  removeComments: false,
  omitTrailingSemicolon: true,
});

export const dshLoader: LoaderDefinitionFunction<Options> = async function (
  source
) {
  const options = this.getOptions();

  let ast = ts.createSourceFile(
    this.resourcePath,
    source,
    ts.ScriptTarget.Latest,
    false
  );

  const addDependency = this.addDependency.bind(this);

  ast = ts.transform(ast, [
    transformFactoryShell({ options, addDependency }),
    transformFactoryI18n({ options, addDependency }),
  ]).transformed[0];

  return printer.printFile(ast);
};

export default dshLoader;
