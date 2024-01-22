# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### PineconeIndex <a name="PineconeIndex" id="pinecone-db-construct.PineconeIndex"></a>

#### Initializers <a name="Initializers" id="pinecone-db-construct.PineconeIndex.Initializer"></a>

```typescript
import { PineconeIndex } from 'pinecone-db-construct'

new PineconeIndex(scope: Construct, id: string, props: PineconeIndexProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pinecone-db-construct.PineconeIndex.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndex.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndex.Initializer.parameter.props">props</a></code> | <code><a href="#pinecone-db-construct.PineconeIndexProps">PineconeIndexProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pinecone-db-construct.PineconeIndex.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pinecone-db-construct.PineconeIndex.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="pinecone-db-construct.PineconeIndex.Initializer.parameter.props"></a>

- *Type:* <a href="#pinecone-db-construct.PineconeIndexProps">PineconeIndexProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pinecone-db-construct.PineconeIndex.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="pinecone-db-construct.PineconeIndex.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pinecone-db-construct.PineconeIndex.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="pinecone-db-construct.PineconeIndex.isConstruct"></a>

```typescript
import { PineconeIndex } from 'pinecone-db-construct'

PineconeIndex.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pinecone-db-construct.PineconeIndex.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pinecone-db-construct.PineconeIndex.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="pinecone-db-construct.PineconeIndex.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### DeploymentSettings <a name="DeploymentSettings" id="pinecone-db-construct.DeploymentSettings"></a>

#### Initializer <a name="Initializer" id="pinecone-db-construct.DeploymentSettings.Initializer"></a>

```typescript
import { DeploymentSettings } from 'pinecone-db-construct'

const deploymentSettings: DeploymentSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pinecone-db-construct.DeploymentSettings.property.deploymentArchitecture">deploymentArchitecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | *No description.* |
| <code><a href="#pinecone-db-construct.DeploymentSettings.property.numAttemptsToRetryOperation">numAttemptsToRetryOperation</a></code> | <code>number</code> | *No description.* |

---

##### `deploymentArchitecture`<sup>Optional</sup> <a name="deploymentArchitecture" id="pinecone-db-construct.DeploymentSettings.property.deploymentArchitecture"></a>

```typescript
public readonly deploymentArchitecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture

---

##### `numAttemptsToRetryOperation`<sup>Optional</sup> <a name="numAttemptsToRetryOperation" id="pinecone-db-construct.DeploymentSettings.property.numAttemptsToRetryOperation"></a>

```typescript
public readonly numAttemptsToRetryOperation: number;
```

- *Type:* number

---

### MetaDataConfig <a name="MetaDataConfig" id="pinecone-db-construct.MetaDataConfig"></a>

#### Initializer <a name="Initializer" id="pinecone-db-construct.MetaDataConfig.Initializer"></a>

```typescript
import { MetaDataConfig } from 'pinecone-db-construct'

const metaDataConfig: MetaDataConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pinecone-db-construct.MetaDataConfig.property.indexed">indexed</a></code> | <code>string[]</code> | *No description.* |

---

##### `indexed`<sup>Required</sup> <a name="indexed" id="pinecone-db-construct.MetaDataConfig.property.indexed"></a>

```typescript
public readonly indexed: string[];
```

- *Type:* string[]

---

### PineconeIndexProps <a name="PineconeIndexProps" id="pinecone-db-construct.PineconeIndexProps"></a>

#### Initializer <a name="Initializer" id="pinecone-db-construct.PineconeIndexProps.Initializer"></a>

```typescript
import { PineconeIndexProps } from 'pinecone-db-construct'

const pineconeIndexProps: PineconeIndexProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pinecone-db-construct.PineconeIndexProps.property.indexSettings">indexSettings</a></code> | <code><a href="#pinecone-db-construct.PineconeIndexSettings">PineconeIndexSettings</a>[]</code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexProps.property.deploymentSettings">deploymentSettings</a></code> | <code><a href="#pinecone-db-construct.DeploymentSettings">DeploymentSettings</a></code> | *No description.* |

---

##### `indexSettings`<sup>Required</sup> <a name="indexSettings" id="pinecone-db-construct.PineconeIndexProps.property.indexSettings"></a>

```typescript
public readonly indexSettings: PineconeIndexSettings[];
```

- *Type:* <a href="#pinecone-db-construct.PineconeIndexSettings">PineconeIndexSettings</a>[]

---

##### `deploymentSettings`<sup>Optional</sup> <a name="deploymentSettings" id="pinecone-db-construct.PineconeIndexProps.property.deploymentSettings"></a>

```typescript
public readonly deploymentSettings: DeploymentSettings;
```

- *Type:* <a href="#pinecone-db-construct.DeploymentSettings">DeploymentSettings</a>

---

### PineconeIndexSettings <a name="PineconeIndexSettings" id="pinecone-db-construct.PineconeIndexSettings"></a>

#### Initializer <a name="Initializer" id="pinecone-db-construct.PineconeIndexSettings.Initializer"></a>

```typescript
import { PineconeIndexSettings } from 'pinecone-db-construct'

const pineconeIndexSettings: PineconeIndexSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.apiKeySecretName">apiKeySecretName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.dimension">dimension</a></code> | <code>number</code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.podSpec">podSpec</a></code> | <code><a href="#pinecone-db-construct.PodSpec">PodSpec</a> \| <a href="#pinecone-db-construct.ServerlessSpec">ServerlessSpec</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.metric">metric</a></code> | <code><a href="#pinecone-db-construct.DistanceMetric">DistanceMetric</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | *No description.* |

---

##### `apiKeySecretName`<sup>Required</sup> <a name="apiKeySecretName" id="pinecone-db-construct.PineconeIndexSettings.property.apiKeySecretName"></a>

```typescript
public readonly apiKeySecretName: string;
```

- *Type:* string

---

##### `dimension`<sup>Required</sup> <a name="dimension" id="pinecone-db-construct.PineconeIndexSettings.property.dimension"></a>

```typescript
public readonly dimension: number;
```

- *Type:* number

---

##### `podSpec`<sup>Required</sup> <a name="podSpec" id="pinecone-db-construct.PineconeIndexSettings.property.podSpec"></a>

```typescript
public readonly podSpec: PodSpec | ServerlessSpec;
```

- *Type:* <a href="#pinecone-db-construct.PodSpec">PodSpec</a> | <a href="#pinecone-db-construct.ServerlessSpec">ServerlessSpec</a>

---

##### `metric`<sup>Optional</sup> <a name="metric" id="pinecone-db-construct.PineconeIndexSettings.property.metric"></a>

```typescript
public readonly metric: DistanceMetric;
```

- *Type:* <a href="#pinecone-db-construct.DistanceMetric">DistanceMetric</a>

---

##### `name`<sup>Optional</sup> <a name="name" id="pinecone-db-construct.PineconeIndexSettings.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="pinecone-db-construct.PineconeIndexSettings.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy

---

### PodSpec <a name="PodSpec" id="pinecone-db-construct.PodSpec"></a>

#### Initializer <a name="Initializer" id="pinecone-db-construct.PodSpec.Initializer"></a>

```typescript
import { PodSpec } from 'pinecone-db-construct'

const podSpec: PodSpec = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pinecone-db-construct.PodSpec.property.environment">environment</a></code> | <code><a href="#pinecone-db-construct.PineConeEnvironment">PineConeEnvironment</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodSpec.property.metaDataConfig">metaDataConfig</a></code> | <code><a href="#pinecone-db-construct.MetaDataConfig">MetaDataConfig</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodSpec.property.numPods">numPods</a></code> | <code>number</code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodSpec.property.numReplicas">numReplicas</a></code> | <code>number</code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodSpec.property.podInstanceSize">podInstanceSize</a></code> | <code><a href="#pinecone-db-construct.PodInstanceSize">PodInstanceSize</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodSpec.property.podInstanceType">podInstanceType</a></code> | <code><a href="#pinecone-db-construct.PodInstanceType">PodInstanceType</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodSpec.property.shards">shards</a></code> | <code>number</code> | *No description.* |

---

##### `environment`<sup>Required</sup> <a name="environment" id="pinecone-db-construct.PodSpec.property.environment"></a>

```typescript
public readonly environment: PineConeEnvironment;
```

- *Type:* <a href="#pinecone-db-construct.PineConeEnvironment">PineConeEnvironment</a>

---

##### `metaDataConfig`<sup>Optional</sup> <a name="metaDataConfig" id="pinecone-db-construct.PodSpec.property.metaDataConfig"></a>

```typescript
public readonly metaDataConfig: MetaDataConfig;
```

- *Type:* <a href="#pinecone-db-construct.MetaDataConfig">MetaDataConfig</a>

---

##### `numPods`<sup>Optional</sup> <a name="numPods" id="pinecone-db-construct.PodSpec.property.numPods"></a>

```typescript
public readonly numPods: number;
```

- *Type:* number

---

##### `numReplicas`<sup>Optional</sup> <a name="numReplicas" id="pinecone-db-construct.PodSpec.property.numReplicas"></a>

```typescript
public readonly numReplicas: number;
```

- *Type:* number

---

##### `podInstanceSize`<sup>Optional</sup> <a name="podInstanceSize" id="pinecone-db-construct.PodSpec.property.podInstanceSize"></a>

```typescript
public readonly podInstanceSize: PodInstanceSize;
```

- *Type:* <a href="#pinecone-db-construct.PodInstanceSize">PodInstanceSize</a>

---

##### `podInstanceType`<sup>Optional</sup> <a name="podInstanceType" id="pinecone-db-construct.PodSpec.property.podInstanceType"></a>

```typescript
public readonly podInstanceType: PodInstanceType;
```

- *Type:* <a href="#pinecone-db-construct.PodInstanceType">PodInstanceType</a>

---

##### `shards`<sup>Optional</sup> <a name="shards" id="pinecone-db-construct.PodSpec.property.shards"></a>

```typescript
public readonly shards: number;
```

- *Type:* number

---

### ServerlessSpec <a name="ServerlessSpec" id="pinecone-db-construct.ServerlessSpec"></a>

#### Initializer <a name="Initializer" id="pinecone-db-construct.ServerlessSpec.Initializer"></a>

```typescript
import { ServerlessSpec } from 'pinecone-db-construct'

const serverlessSpec: ServerlessSpec = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pinecone-db-construct.ServerlessSpec.property.cloudProvider">cloudProvider</a></code> | <code><a href="#pinecone-db-construct.CloudProvider">CloudProvider</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.ServerlessSpec.property.region">region</a></code> | <code><a href="#pinecone-db-construct.Region">Region</a></code> | *No description.* |

---

##### `cloudProvider`<sup>Required</sup> <a name="cloudProvider" id="pinecone-db-construct.ServerlessSpec.property.cloudProvider"></a>

```typescript
public readonly cloudProvider: CloudProvider;
```

- *Type:* <a href="#pinecone-db-construct.CloudProvider">CloudProvider</a>

---

##### `region`<sup>Required</sup> <a name="region" id="pinecone-db-construct.ServerlessSpec.property.region"></a>

```typescript
public readonly region: Region;
```

- *Type:* <a href="#pinecone-db-construct.Region">Region</a>

---



## Enums <a name="Enums" id="Enums"></a>

### CloudProvider <a name="CloudProvider" id="pinecone-db-construct.CloudProvider"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pinecone-db-construct.CloudProvider.AWS">AWS</a></code> | *No description.* |

---

##### `AWS` <a name="AWS" id="pinecone-db-construct.CloudProvider.AWS"></a>

---


### DistanceMetric <a name="DistanceMetric" id="pinecone-db-construct.DistanceMetric"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pinecone-db-construct.DistanceMetric.EUCLIDEAN">EUCLIDEAN</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.DistanceMetric.COSINE">COSINE</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.DistanceMetric.DOT_PRODUCT">DOT_PRODUCT</a></code> | *No description.* |

---

##### `EUCLIDEAN` <a name="EUCLIDEAN" id="pinecone-db-construct.DistanceMetric.EUCLIDEAN"></a>

---


##### `COSINE` <a name="COSINE" id="pinecone-db-construct.DistanceMetric.COSINE"></a>

---


##### `DOT_PRODUCT` <a name="DOT_PRODUCT" id="pinecone-db-construct.DistanceMetric.DOT_PRODUCT"></a>

---


### PineConeEnvironment <a name="PineConeEnvironment" id="pinecone-db-construct.PineConeEnvironment"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_STARTER">GCP_STARTER</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_FREE_US_WEST_1">GCP_FREE_US_WEST_1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_FREE_ASIA_SOUTHEAST_1">GCP_FREE_ASIA_SOUTHEAST_1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_FREE_US_WEST_4">GCP_FREE_US_WEST_4</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_STD_US_WEST_1">GCP_STD_US_WEST_1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_STD_US_CENTRAL_1">GCP_STD_US_CENTRAL_1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_STD_US_WEST_4">GCP_STD_US_WEST_4</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_STD_US_EAST_4">GCP_STD_US_EAST_4</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_STD_NORTH_AMERICA_NORTHEAST_1">GCP_STD_NORTH_AMERICA_NORTHEAST_1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_STD_ASIA_NORTHEAST_1">GCP_STD_ASIA_NORTHEAST_1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_STD_ASIA_SOUTHEAST_1">GCP_STD_ASIA_SOUTHEAST_1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_STD_US_EAST_1">GCP_STD_US_EAST_1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_STD_EU_WEST_1">GCP_STD_EU_WEST_1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.GCP_STD_EU_WEST_4">GCP_STD_EU_WEST_4</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.AWS_STD_US_EAST_1">AWS_STD_US_EAST_1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineConeEnvironment.AZURE_STD_EAST_US">AZURE_STD_EAST_US</a></code> | *No description.* |

---

##### `GCP_STARTER` <a name="GCP_STARTER" id="pinecone-db-construct.PineConeEnvironment.GCP_STARTER"></a>

---


##### `GCP_FREE_US_WEST_1` <a name="GCP_FREE_US_WEST_1" id="pinecone-db-construct.PineConeEnvironment.GCP_FREE_US_WEST_1"></a>

---


##### `GCP_FREE_ASIA_SOUTHEAST_1` <a name="GCP_FREE_ASIA_SOUTHEAST_1" id="pinecone-db-construct.PineConeEnvironment.GCP_FREE_ASIA_SOUTHEAST_1"></a>

---


##### `GCP_FREE_US_WEST_4` <a name="GCP_FREE_US_WEST_4" id="pinecone-db-construct.PineConeEnvironment.GCP_FREE_US_WEST_4"></a>

---


##### `GCP_STD_US_WEST_1` <a name="GCP_STD_US_WEST_1" id="pinecone-db-construct.PineConeEnvironment.GCP_STD_US_WEST_1"></a>

---


##### `GCP_STD_US_CENTRAL_1` <a name="GCP_STD_US_CENTRAL_1" id="pinecone-db-construct.PineConeEnvironment.GCP_STD_US_CENTRAL_1"></a>

---


##### `GCP_STD_US_WEST_4` <a name="GCP_STD_US_WEST_4" id="pinecone-db-construct.PineConeEnvironment.GCP_STD_US_WEST_4"></a>

---


##### `GCP_STD_US_EAST_4` <a name="GCP_STD_US_EAST_4" id="pinecone-db-construct.PineConeEnvironment.GCP_STD_US_EAST_4"></a>

---


##### `GCP_STD_NORTH_AMERICA_NORTHEAST_1` <a name="GCP_STD_NORTH_AMERICA_NORTHEAST_1" id="pinecone-db-construct.PineConeEnvironment.GCP_STD_NORTH_AMERICA_NORTHEAST_1"></a>

---


##### `GCP_STD_ASIA_NORTHEAST_1` <a name="GCP_STD_ASIA_NORTHEAST_1" id="pinecone-db-construct.PineConeEnvironment.GCP_STD_ASIA_NORTHEAST_1"></a>

---


##### `GCP_STD_ASIA_SOUTHEAST_1` <a name="GCP_STD_ASIA_SOUTHEAST_1" id="pinecone-db-construct.PineConeEnvironment.GCP_STD_ASIA_SOUTHEAST_1"></a>

---


##### `GCP_STD_US_EAST_1` <a name="GCP_STD_US_EAST_1" id="pinecone-db-construct.PineConeEnvironment.GCP_STD_US_EAST_1"></a>

---


##### `GCP_STD_EU_WEST_1` <a name="GCP_STD_EU_WEST_1" id="pinecone-db-construct.PineConeEnvironment.GCP_STD_EU_WEST_1"></a>

---


##### `GCP_STD_EU_WEST_4` <a name="GCP_STD_EU_WEST_4" id="pinecone-db-construct.PineConeEnvironment.GCP_STD_EU_WEST_4"></a>

---


##### `AWS_STD_US_EAST_1` <a name="AWS_STD_US_EAST_1" id="pinecone-db-construct.PineConeEnvironment.AWS_STD_US_EAST_1"></a>

---


##### `AZURE_STD_EAST_US` <a name="AZURE_STD_EAST_US" id="pinecone-db-construct.PineConeEnvironment.AZURE_STD_EAST_US"></a>

---


### PodInstanceSize <a name="PodInstanceSize" id="pinecone-db-construct.PodInstanceSize"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pinecone-db-construct.PodInstanceSize.X1">X1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodInstanceSize.X2">X2</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodInstanceSize.X4">X4</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodInstanceSize.X8">X8</a></code> | *No description.* |

---

##### `X1` <a name="X1" id="pinecone-db-construct.PodInstanceSize.X1"></a>

---


##### `X2` <a name="X2" id="pinecone-db-construct.PodInstanceSize.X2"></a>

---


##### `X4` <a name="X4" id="pinecone-db-construct.PodInstanceSize.X4"></a>

---


##### `X8` <a name="X8" id="pinecone-db-construct.PodInstanceSize.X8"></a>

---


### PodInstanceType <a name="PodInstanceType" id="pinecone-db-construct.PodInstanceType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pinecone-db-construct.PodInstanceType.S1">S1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodInstanceType.P1">P1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodInstanceType.P2">P2</a></code> | *No description.* |

---

##### `S1` <a name="S1" id="pinecone-db-construct.PodInstanceType.S1"></a>

---


##### `P1` <a name="P1" id="pinecone-db-construct.PodInstanceType.P1"></a>

---


##### `P2` <a name="P2" id="pinecone-db-construct.PodInstanceType.P2"></a>

---


### Region <a name="Region" id="pinecone-db-construct.Region"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pinecone-db-construct.Region.US_WEST_2">US_WEST_2</a></code> | *No description.* |

---

##### `US_WEST_2` <a name="US_WEST_2" id="pinecone-db-construct.Region.US_WEST_2"></a>

---

