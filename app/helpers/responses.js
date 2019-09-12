// Success
exports.ok = function ok(result, res) { res.status('200').json(result); };
exports.created = function created(result, res) { res.status('201').json(result); };

// Errors
// 400
exports.bad_request = function badRequest(res) { res.status('400').send({ message: 'Bad_Request' }); };
// 401
exports.unauthenticated = function unauthenticated(res) { res.status('401').send({ message: 'Unauthorized' }); };
// 403
exports.forbidden = function forbidden(res) { res.status('403').send({ message: 'Forbidden' }); };
// 404
exports.not_found = function notFound(res) { res.status('404').send({ message: 'Not_Found' }); };
// 500
exports.internal_server_error = function internalServerError(res) { res.status('500').send({ message: 'Internal_Server_Error' }); };
