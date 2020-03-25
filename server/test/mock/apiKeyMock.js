exports.getApiKeys = () => {
  return (req, res) => {
    /*   res
     .status(400)
      .send(
        'This is a hardcoded error (in apiKeyMock.js). Do not panic. We only use this for testing how error handling works in the frontend. And to make sure we can see this error message. '
      )*/
    res.status(200).json([
      {
        team: 'team3',
        groupId: '54fb2d74-97bd-40c2-a112-085de2739fc6',
        key: 'b4n4nk4k353c328714ec75dd31c32b8aaca7eaee06fa36ac7c79322f574ce571',
        expires: '2025-03-23T14:05:18.555205Z',
        created: '2020-03-23T14:05:18.555205Z'
      },
      {
        team: 'team3',
        groupId: '54fb2d74-97bd-40c2-a112-085de2739fc6',
        key: '69n4nk4k353c328714ec75dd31c32b8aaca7eaee06fa36ac7c79322f574ce571',
        expires: '2020-03-23T14:05:18.555Z',
        created: '2019-03-23T14:05:18.555Z'
      },
      {
        team: 'team2',
        groupId: '59dbf5e6-8243-471c-bd57-162346f08d75',
        key: '1337f763d69c328714ec69dd31c32b8aaca7eaee06fa36ac7c79322f574ce571',
        expires: '2025-03-23T14:05:18.555205Z',
        created: '2020-03-23T14:05:18.555205Z'
      },
      {
        team: 'team1',
        groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
        key: 'k4k3sfdf849fg4k4k3ølj443dløkjølkjsdfgsdfgdf69443',
        created: '2018-03-16T10:29:58.05+01:00',
        expires: '2020-03-16T10:30:23.655+01:00'
      }
    ])
  }
}
