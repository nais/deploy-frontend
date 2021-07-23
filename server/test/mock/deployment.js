const deploymentData = {
  deployments: [
    {
      deployment: {
        id: 'c3e5643d-59d3-46c5-af26-1ed7d4cd3c99',
        team: 'teamsamtykkedigitalisering',
        created: '2021-07-07T13:13:10.656408Z',
        githubID: 389261345,
        githubRepository: 'navikt/brukertest-portal',
        cluster: 'dev-gcp',
        state: null,
      },
      statuses: [
        {
          id: '6976a07d-aa63-4f9f-a91f-b05ea5383cdf',
          deploymentID: 'c3e5643d-59d3-46c5-af26-1ed7d4cd3c99',
          status: 'in_progress',
          message:
            'Pod/brukertest-portal-6b9d76fb8c-hnb5s (Unhealthy): Readiness probe failed: HTTP probe failed with statuscode: 502',
          created: '2021-07-07T13:14:30.14263Z',
        },
      ],
      resources: [
        {
          id: 'd70c2e66-bd98-443a-bedb-f246082bef0b',
          deploymentID: 'c3e5643d-59d3-46c5-af26-1ed7d4cd3c99',
          index: 0,
          group: 'nais.io',
          version: 'v1alpha1',
          kind: 'Application',
          name: 'brukertest-portal',
          namespace: 'teamsamtykkedigitalisering',
        },
      ],
    },
    {
      deployment: {
        id: '056ac152-4832-49bb-b3bc-dd88f8ca3065',
        team: 'teamsamtykkedigitalisering',
        created: '2021-07-07T13:12:49.288078Z',
        githubID: 389261180,
        githubRepository: 'navikt/brukertest-portal',
        cluster: 'prod-gcp',
        state: null,
      },
      statuses: [
        {
          id: '4d4bfae4-ff8f-4bf2-b5e1-d808024d0e1c',
          deploymentID: '056ac152-4832-49bb-b3bc-dd88f8ca3065',
          status: 'in_progress',
          message:
            'Pod/brukertest-portal-64b8d6d4ff-g9x9k (Unhealthy): Readiness probe failed: HTTP probe failed with statuscode: 502',
          created: '2021-07-07T13:14:29.54815Z',
        },
      ],
      resources: [
        {
          id: '76afa897-c4d9-432f-b295-8fa1e972bc3a',
          deploymentID: '056ac152-4832-49bb-b3bc-dd88f8ca3065',
          index: 0,
          group: 'nais.io',
          version: 'v1alpha1',
          kind: 'Application',
          name: 'brukertest-portal',
          namespace: 'teamsamtykkedigitalisering',
        },
      ],
    },
    {
      deployment: {
        id: '7cd12a62-45e0-426a-9cc7-0c170afe1ec5',
        team: 'personbruker',
        created: '2021-07-07T13:11:13.529465Z',
        githubID: 389260478,
        githubRepository: 'navikt/nav-enonicxp-frontend',
        cluster: 'dev-sbs',
        state: null,
      },
      statuses: [
        {
          id: 'a981f37a-48c8-4f3f-8f5d-4dea1c2e0bb9',
          deploymentID: '7cd12a62-45e0-426a-9cc7-0c170afe1ec5',
          status: 'success',
          message: 'Deployment completed successfully.',
          created: '2021-07-07T13:12:14.012679Z',
        },
      ],
      resources: [
        {
          id: '3aff49b7-41c9-4e04-a185-4a1cb0b28526',
          deploymentID: '7cd12a62-45e0-426a-9cc7-0c170afe1ec5',
          index: 0,
          group: 'nais.io',
          version: 'v1alpha1',
          kind: 'Application',
          name: 'nav-enonicxp-frontend',
          namespace: 'q6',
        },
      ],
    },
    {
      deployment: {
        id: '67cc1bfc-7099-4f5e-8e1a-1d3dc1d3b325',
        team: 'teamdatajegerne',
        created: '2021-07-07T13:10:59.264075Z',
        githubID: 389260348,
        githubRepository: 'navikt/etterlevelse',
        cluster: 'dev-gcp',
        state: null,
      },
      statuses: [
        {
          id: '26fba76e-ea28-403a-a9d6-05e2ef20fdbd',
          deploymentID: '67cc1bfc-7099-4f5e-8e1a-1d3dc1d3b325',
          status: 'success',
          message: 'Deployment completed successfully.',
          created: '2021-07-07T13:11:26.205455Z',
        },
      ],
      resources: [
        {
          id: '4d3199b6-835b-4223-b6e4-fe3dab37c4a2',
          deploymentID: '67cc1bfc-7099-4f5e-8e1a-1d3dc1d3b325',
          index: 0,
          group: 'nais.io',
          version: 'v1alpha1',
          kind: 'Application',
          name: 'etterlevelse-frontend',
          namespace: 'teamdatajegerne',
        },
      ],
    },
  ],
}

module.exports = deploymentData
