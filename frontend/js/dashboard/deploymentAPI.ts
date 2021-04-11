import * as z from 'zod'

const DeploymentSchema = z.object({
  cluster: z.string().nullable(),
  created: z.string(), // better support for date transformations expected with Zod 3
  githubID: z.number().nullable(),
  githubRepository: z.string().nullable(),
  id: z.string(),
  state: z.any().nullable(), // FIXME: I haven't seen this != null
  team: z.string(),
})

const StatusSchema = z.object({
  created: z.string(),
  deploymentID: z.string().uuid(),
  id: z.string().uuid(),
  message: z.string().nullable(),
  status: z.string(),
})

const ResourceSchema = z.object({
  deploymentID: z.string().uuid(),
  group: z.string().nullable(),
  id: z.string(),
  index: z.number(),
  kind: z.string(),
  name: z.string(),
  namespace: z.string(),
  version: z.string(),
})

export const DeploymentDataSchema = z.object({
  deployment: DeploymentSchema,
  statuses: StatusSchema.array().nullable(),
  resources: ResourceSchema.array().nullable(),
})

export const DeploymentListSchema = DeploymentDataSchema.array()

export const getDeployments = async (filters): Promise<DeploymentList> => {
  let apiURL = '/downstream/api/v1/dashboard/deployments?'
  for (let [key, value] of filters) {
    apiURL += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`
  }
  const res = await fetch(apiURL)
  const json = await res.json()
  return DeploymentListSchema.parse(json.deployments)
}

export type Deployment = z.infer<typeof DeploymentSchema>
export type Status = z.infer<typeof StatusSchema>
export type Resource = z.infer<typeof ResourceSchema>
export type DeploymentData = z.infer<typeof DeploymentDataSchema>
export type DeploymentList = z.infer<typeof DeploymentListSchema>
