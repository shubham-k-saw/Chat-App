const durationToUnixTimeStamp = async (duration) => {
  // Extracting the value and unit from the time string
  const regex = /^(\d+)([mhd]?)$/
  const match = duration.match(regex)
  const [, value, unit] = match

  const milisecondsInUnit = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  }

  const durationInMilliseconds = parseInt(value) * milisecondsInUnit[unit || 's']
  const unixTimeStamp = Date.now() + durationInMilliseconds

  return unixTimeStamp
}

export { durationToUnixTimeStamp }
