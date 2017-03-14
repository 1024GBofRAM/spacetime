
## when you move a js Date object to a remote tz, then call `.getDate()`, you are going to get the wrong date.

this is because js Date objects are always on the local calendar of the running computer.
![pasted image at 2017_02_22 10_47 am](https://cloud.githubusercontent.com/assets/399657/23219219/7db8628a-f8ec-11e6-868c-58cf40160936.png)

this is a wrapper of the js Date object. Internally, it represents any wacky timezone as your own local timezone.
so whenever you query for calendar information, it says the right thing, because it can do that.

when you ask for non-calendar-based information, like an epoch, you don't need to kick it back + forth, because it can do that too.

things it does:

* easy output of `local`, `remote`, or `utc/epoch` dates

* morning, evening, midnight

* sameDay, week month, year comparisons (tricksy)

* last/next/this for day, week & year

* current week, quarter, season, lookup

* metadata about current timezone + Daylight-savings state

## API
```js
var spacetime=require('spacetime')

//couple helper fns:
s = spacetime.now()
s = spacetime.today() //this morning
s = spacetime.tomorrow() //tomorrow morning


//date inputs
s = spacetime(1489520157)//epoch
s = spacetime([2017, 5, 2])//yyyy, m, d  (zero-based months, 1-based days)
s = spacetime('July 2, 2017 5:01:00')//iso-thing
//remotely-understood date
s = spacetime(1489520157, 'Canada/Pacific')


//misc fns
s.goto('Australia/Brisbane')  //roll-into a new timezone, at the same moment
s.clone()   // make a copy
s.isValid() // sept 32nd -> false


//get/set methods
s.date()//14
s.year()//2017
s.season()//spring
s.hour(5)//change to 5am
s.date(15)//change to the 15th
s.day('monday')//change to (this weeks) monday
s.month('march')//change to (this year's) march 1st
s.quarter(2)//change to april 1st


//add/subtract methods
s.add(1, 'week')
s.add(3, 'quarters')
s.subtract(2, 'months').add(1,'day')


//timezone meta-data
s.timezone().name //'Canada/Eastern' (either inferred or explicit)
s.timezone().hemisphere //north
s.timezone().current.offset //-240 (in minutes)
s.timezone().current.isDst //true


//comparisons
let d = spacetime([2017, 5, 2])
//gt/lt/equals
s.isAfter(d)//true
s.isEqual(d)//false
s.isBefore(d)//false
//comparison-by-unit
s.isSame(d, 'year')//true
s.isSame(d, 'date')//false


//formatting
s.format().time.short //  '5:01am'
s.format().numeric.uk //  02/03/2017
s.format().month.long // 'April'
s.emoji().season      // '⛄'


//calendar-sensitive movement
s.startOf('day')   // 12:01am
s.startOf('month') // 12:01am, april 1st
s.endOf('quarter') // 11:59:59pm, june 30th


//percentage-based information
s.progress().month = 0.23 //(we're a quarter-way through the month)
s.progress().day = 0.48 //almost noon!
s.progress().hour = 0.99 // 8:59 and 59seconds
```
