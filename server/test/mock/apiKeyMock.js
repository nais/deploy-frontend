exports.getApiKeys = () => {
  return (req, res) => {
    res.status(200).json([
      {
        team: 'team1',
        groupId: '6fbc76c4-7909-4e58-99fa-64d542567c8c',
        key: 'DetteErEnSecret',
        expires: '2020-03-16T10:29:58.05+01:00',
        created: '2022-03-16T10:30:23.655+01:00'
      }
    ])
  }
}
