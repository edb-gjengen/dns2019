import moment from 'moment'
import 'moment/locale/nb'

moment.locale('nb')

export const fixTz = dt => {
  /*
  TODO:
  Somewhere along the way, timezone information is lost.
  Revisit when fetching data directly from WP using GraphQL?

  Start time example
    when DST: 2020-10-29T16:30:00+00:00
    no DST:   2020-10-29T17:30:00+00:00
    intended: 2020-10-29T18:30:00

  Let's remove the bogus timezone info and add the UTC offset manually
  */
  if (!dt) {
    return null
  }
  const naive = dt.replace('+00:00', '')
  const dst = moment(naive).isDST()
  const utcOffset = dst ? 2 : 1
  return moment.utc(naive).utcOffset(utcOffset)
}
