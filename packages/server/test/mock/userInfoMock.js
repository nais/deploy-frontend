exports.getUserInfo = () => {
  return (req, res) => {
    res.status(200).json({
      '@odata.context':
        'https://graph.microsoft.com/v1.0/$metadata#users(onPremisesSamAccountName,displayName,givenName,mail,officeLocation,surname,userPrincipalName,id)/$entity',
      onPremisesSamAccountName: 'X123456',
      displayName: 'Lastsen, First',
      givenName: 'First',
      mail: 'first.lastsen@banana.cake',
      officeLocation: 'The office',
      surname: 'Lastsen',
      userPrincipalName: 'first.lastsen@banana.cake',
      id: 'c4k3-6969-abcd-b456-64n4na'
    })
  }
}
