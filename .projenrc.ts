import { AwsCdkConstructLibrary } from 'projen/lib/awscdk';
import { NodePackageManager } from 'projen/lib/javascript';


const library = new AwsCdkConstructLibrary({
  author: 'Jacob Petterle',
  name: 'pinecone-db-construct',
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
    'aws-cdk-lib@^2.0',
    '@aws-cdk/aws-lambda-python-alpha@^2.100.0-alpha.0',
  ],
  devDeps: [
    'projen@^0.75',
    'pnpm@^8.0',
  ],
});

// force using pnpm
library.addScripts({
  preinstall: 'npx only-allow pnpm',
});

library.gitignore.exclude('.pnpm-store/');

library.synth();
