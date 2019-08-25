function fixDocument (data) {
  if (data) {
    delete data._id
    return data
  } else {
    return {}
  }
}

module.exports = data => {
  return Array.isArray(data) ? data.map(fixDocument) : fixDocument(data)
}
