exports.getApiKeys = () => {
  return (req, res) => {
    /*   res
     .status(400)
      .send(
        'This is a hardcoded error (in apiKeyMock.js). Do not panic. We only use this for testing how error handling works in the frontend. And to make sure we can see this error message. '
      )*/

    res.status(200).json([
      {
        team: 'team1',
        groupId: '6fbc76c4-7909-4e58-99fa-64d542567c8c',
        key: 'b4n4ndf849fg4adsfølj443dløkjølkjsdfgsdfgdf69443',
        created: '2020-03-16T10:29:58.05+01:00',
        expires: '2022-03-16T10:30:23.655+01:00'
      },
      {
        team: 'team2',
        groupId: '6fafac4-7909-4e58-99fa-64d542567c8c',
        key: 'k4k3sfdf849fg4k4k3ølj443dløkjølkjsdfgsdfgdf69443',
        created: '2018-03-16T10:29:58.05+01:00',
        expires: '2020-03-16T10:30:23.655+01:00'
      }
    ])
  }
}
