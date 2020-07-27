module.exports = (data) => {
  return {
    status: data.status || false,
    msg: data.msg || null,
    result: data.result || [],
    options: data.options || []
  }
}
