export const calculateRiskScore = (cod: number, total: number) => {
  if (total === 0) return 0
  return (cod / total) * 100
}

export const getRiskLevel = (score: number) => {
  if (score > 70) return 'High Risk'
  if (score >= 40) return 'Medium Risk'
  return 'Safe'
}