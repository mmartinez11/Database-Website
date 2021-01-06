const mysqlx      = require('@mysql/xdevapi');

module.exports =
{
twoVar : async function (x, y, q)
{
  const mysqlx      = require('@mysql/xdevapi');

  // Connect to server using a connection URL
  var mySession = mysqlx.getSession( {
   host: 'localhost', port: 33060,
   user: 'root', password: 'Cosmos.Red.11.',
   schema:'anime_project'} )
   .then (session =>{
     
	 var myResult = session.sql(q).bind(x, y).execute();
	 return myResult
 })
 .then(result => {
	return result.fetchAll();
 });
 return mySession;
},


oneVar : async function (x, q)
{
  const mysqlx      = require('@mysql/xdevapi');

  // Connect to server using a connection URL
  var mySession = mysqlx.getSession( {
   host: 'localhost', port: 33060,
   user: 'root', password: 'Cosmos.Red.11.',
   schema:'anime_project'} )
   .then (session =>{
     
	 var myResult = session.sql(q).bind(x).execute();
	 return myResult
 })
 .then(result => {
	return result.fetchAll();
 });
 return mySession;
},

fiveVar : async function (a, b, c, d, e, q)
{
  const mysqlx      = require('@mysql/xdevapi');

  // Connect to server using a connection URL
  var mySession = mysqlx.getSession( {
   host: 'localhost', port: 33060,
   user: 'root', password: 'Cosmos.Red.11.',
   schema:'anime_project'} )
   .then (session =>{
     
   var myResult = session.sql(q).bind(a, b, c, d, e).execute();
   return myResult
 })
 .then(result => {
  return result.fetchAll();
 });
 return mySession;
}



}
// module.exports =
// {
// signupAccount : async function (u, p)
// {
//   const mysqlx      = require('@mysql/xdevapi');

//   // Connect to server using a connection URL
//   var mySession = mysqlx.getSession( {
//    host: 'localhost', port: 33060,
//    user: 'root', password: '248778',
//    schema:'anime_project'} )
//    .then (session =>{
     
// 	 var myResult = session.sql('SELECT signupAccount(?,?)').bind(u, p).execute();
// 	 return myResult
//  })
//  .then(result => {
// 	return result.fetchAll();
//  });
//  return mySession;
// }
// }
