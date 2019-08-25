function anonymize (data) {
  return `${data.toString().substring(0, 6)}xxxxx`
}

module.exports = data => {
  return Array.isArray(data) ? data.map(anonymize).join(', ') : anonymize(data)
}
