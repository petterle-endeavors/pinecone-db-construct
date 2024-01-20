import { JsonPatch } from 'projen';
import { AwsCdkConstructLibrary } from 'projen/lib/awscdk';
import { NodePackageManager } from 'projen/lib/javascript';


const PACKAGE_NAME = 'pinecone-db-construct';

const library = new AwsCdkConstructLibrary({
  author: 'Jacob Petterle',
  name: PACKAGE_NAME,
  description: 'A CDK construct for Pinecone Indexes',
  cdkVersion: '2.118.0',
  repositoryUrl: 'https://github.com/petterle-endeavors/pinecone-db-construct',
  authorAddress: 'jacobpetterle@gmail.com',
  defaultReleaseBranch: 'main',
  packageManager: NodePackageManager.PNPM,
  projenrcTs: true,
  publishToPypi: {
    distName: 'pinecone-db-construct',
    module: 'pinecone_db_construct',
  },
  // publishToMaven: {
  //   javaPackage: 'com.github.petterleendeavors.pineconedbconstruct',
  //   mavenGroupId: 'com.github.petterleendeavors',
  //   mavenArtifactId: 'pinecone-db-construct',
  // },
  // publishToNuget: {
  //   dotNetNamespace: 'PetterleEndeavors.PineconeDbConstruct',
  //   packageId: 'PineconeDbConstruct',
  // },
  // publishToGo: {
  //   gitUserName: 'petterle-endeavors',
  //   gitUserEmail: 'jacobpetterle@gmail.com',
  //   moduleName: 'github.com/petterle-endeavors/pinecone-db-construct',
  // },
  deps: [
    '@aws-cdk/aws-lambda-python-alpha@^2.100.0-alpha.0',
    'js-md5@^0.8',
  ],
  devDeps: [
    'projen@^0.75',
  ],
  bundledDeps: [
    'js-md5@^0.8',
  ],
});

// force using pnpm
library.addScripts({
  'preinstall': 'npx only-allow pnpm',
  'cdk-deploy': 'pnpm compile && cdk deploy --app "lib/examples/app.js" --require-approval never',
});

library.gitignore.exclude('.pnpm-store/');

const releaseWorkflow = library.tryFindObjectFile('.github/workflows/release.yml');
releaseWorkflow?.patch(
  JsonPatch.add(
    '/jobs/release_pypi/permissions/id-token',
    'write',
  ),
  JsonPatch.add(
    '/jobs/release_pypi/environment',
    {
      name: 'pypi',
      url: `https://pypi.org/p/${PACKAGE_NAME}`,
    },
  ),
  JsonPatch.remove(
    '/jobs/release_pypi/steps/-1',
  ),
  JsonPatch.add(
    '/jobs/release_pypi/steps/-',
    {
      name: 'Publish Package to PyPI',
      uses: 'pypa/gh-action-pypi-publish@release/v1',
      with: {
        'packages-dir': 'dist/python',
      },
    },
  ),
);

library.synth();
