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

### CustomResourceSettings <a name="CustomResourceSettings" id="pinecone-db-construct.CustomResourceSettings"></a>

#### Initializer <a name="Initializer" id="pinecone-db-construct.CustomResourceSettings.Initializer"></a>

```typescript
import { CustomResourceSettings } from 'pinecone-db-construct'

const customResourceSettings: CustomResourceSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pinecone-db-construct.CustomResourceSettings.property.numAttemptsToRetryOperation">numAttemptsToRetryOperation</a></code> | <code>number</code> | *No description.* |

---

##### `numAttemptsToRetryOperation`<sup>Optional</sup> <a name="numAttemptsToRetryOperation" id="pinecone-db-construct.CustomResourceSettings.property.numAttemptsToRetryOperation"></a>

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
| <code><a href="#pinecone-db-construct.PineconeIndexProps.property.customResourceSettings">customResourceSettings</a></code> | <code><a href="#pinecone-db-construct.CustomResourceSettings">CustomResourceSettings</a></code> | *No description.* |

---

##### `indexSettings`<sup>Required</sup> <a name="indexSettings" id="pinecone-db-construct.PineconeIndexProps.property.indexSettings"></a>

```typescript
public readonly indexSettings: PineconeIndexSettings[];
```

- *Type:* <a href="#pinecone-db-construct.PineconeIndexSettings">PineconeIndexSettings</a>[]

---

##### `customResourceSettings`<sup>Optional</sup> <a name="customResourceSettings" id="pinecone-db-construct.PineconeIndexProps.property.customResourceSettings"></a>

```typescript
public readonly customResourceSettings: CustomResourceSettings;
```

- *Type:* <a href="#pinecone-db-construct.CustomResourceSettings">CustomResourceSettings</a>

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
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.environment">environment</a></code> | <code><a href="#pinecone-db-construct.PineConeEnvironment">PineConeEnvironment</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.metadataConfig">metadataConfig</a></code> | <code><a href="#pinecone-db-construct.MetaDataConfig">MetaDataConfig</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.metric">metric</a></code> | <code><a href="#pinecone-db-construct.DistanceMetric">DistanceMetric</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.podInstanceType">podInstanceType</a></code> | <code><a href="#pinecone-db-construct.PodType">PodType</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.pods">pods</a></code> | <code>number</code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.podSize">podSize</a></code> | <code><a href="#pinecone-db-construct.PodSize">PodSize</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.replicas">replicas</a></code> | <code>number</code> | *No description.* |
| <code><a href="#pinecone-db-construct.PineconeIndexSettings.property.sourceCollection">sourceCollection</a></code> | <code>string</code> | *No description.* |

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

##### `environment`<sup>Required</sup> <a name="environment" id="pinecone-db-construct.PineconeIndexSettings.property.environment"></a>

```typescript
public readonly environment: PineConeEnvironment;
```

- *Type:* <a href="#pinecone-db-construct.PineConeEnvironment">PineConeEnvironment</a>

---

##### `metadataConfig`<sup>Optional</sup> <a name="metadataConfig" id="pinecone-db-construct.PineconeIndexSettings.property.metadataConfig"></a>

```typescript
public readonly metadataConfig: MetaDataConfig;
```

- *Type:* <a href="#pinecone-db-construct.MetaDataConfig">MetaDataConfig</a>

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

##### `podInstanceType`<sup>Optional</sup> <a name="podInstanceType" id="pinecone-db-construct.PineconeIndexSettings.property.podInstanceType"></a>

```typescript
public readonly podInstanceType: PodType;
```

- *Type:* <a href="#pinecone-db-construct.PodType">PodType</a>

---

##### `pods`<sup>Optional</sup> <a name="pods" id="pinecone-db-construct.PineconeIndexSettings.property.pods"></a>

```typescript
public readonly pods: number;
```

- *Type:* number

---

##### `podSize`<sup>Optional</sup> <a name="podSize" id="pinecone-db-construct.PineconeIndexSettings.property.podSize"></a>

```typescript
public readonly podSize: PodSize;
```

- *Type:* <a href="#pinecone-db-construct.PodSize">PodSize</a>

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="pinecone-db-construct.PineconeIndexSettings.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `replicas`<sup>Optional</sup> <a name="replicas" id="pinecone-db-construct.PineconeIndexSettings.property.replicas"></a>

```typescript
public readonly replicas: number;
```

- *Type:* number

---

##### `sourceCollection`<sup>Optional</sup> <a name="sourceCollection" id="pinecone-db-construct.PineconeIndexSettings.property.sourceCollection"></a>

```typescript
public readonly sourceCollection: string;
```

- *Type:* string

---



## Enums <a name="Enums" id="Enums"></a>

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


### PodSize <a name="PodSize" id="pinecone-db-construct.PodSize"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pinecone-db-construct.PodSize.X1">X1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodSize.X2">X2</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodSize.X4">X4</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodSize.X8">X8</a></code> | *No description.* |

---

##### `X1` <a name="X1" id="pinecone-db-construct.PodSize.X1"></a>

---


##### `X2` <a name="X2" id="pinecone-db-construct.PodSize.X2"></a>

---


##### `X4` <a name="X4" id="pinecone-db-construct.PodSize.X4"></a>

---


##### `X8` <a name="X8" id="pinecone-db-construct.PodSize.X8"></a>

---


### PodType <a name="PodType" id="pinecone-db-construct.PodType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pinecone-db-construct.PodType.S1">S1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodType.P1">P1</a></code> | *No description.* |
| <code><a href="#pinecone-db-construct.PodType.P2">P2</a></code> | *No description.* |

---

##### `S1` <a name="S1" id="pinecone-db-construct.PodType.S1"></a>

---


##### `P1` <a name="P1" id="pinecone-db-construct.PodType.P1"></a>

---


##### `P2` <a name="P2" id="pinecone-db-construct.PodType.P2"></a>

---

