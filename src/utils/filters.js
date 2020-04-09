import moment from 'moment'
/**
 * 时间戳（秒） => 年月日 时分秒
 * @param timestamp 1586361600
 * @returns {'2020-04-09 00:00:00'}
 */
export function formatDate(timestamp) {
  return timestamp ? moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
}
