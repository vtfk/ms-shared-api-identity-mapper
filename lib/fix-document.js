module.exports = data => {
  if (data) {
    delete data._id
    return data
  } else {
    return {}
  }
}
