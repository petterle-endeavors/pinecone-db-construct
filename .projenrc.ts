import { typescript } from 'projen';
import { NodePackageManager } from 'projen/lib/javascript';


const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'pinecone-db-construct',
  description: 'A CDK construct for Pinecone Indexes',
  projenrcTs: true,
  license: 'MIT',
  copyrightOwner: 'Jacob Petterl',
  deps: [
    'projen@^0.75',
    'pnpm@^8.0',
    'jsii@^5.0',
    'jsii-config@^1.0',
  ],
  packageManager: NodePackageManager.PNPM,
});

project.addScripts({
  preinstall: 'npx only-allow pnpm',
});

project.gitignore.exclude('.pnpm-store/');

project.synth();
