import angular from 'angular';
import moment from 'moment';
import calendarTpl from './attendance-calendar.html';

import './style.scss';

module.exports = angular
  .module('app.directives.calendar', [])
  .directive('calendar', calendarDirective)
  .name;
/* @ngInject */
function calendarDirective() {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      today: '='
    },
    replace: true,
    template: calendarTpl,
    link(scope) {
      scope.$watch('data', () => {
        if (scope.data) {
          if (scope.data.nextMonth) {
            scope.nextMonth();
          }
          if (scope.data.tMonth) {
            scope.tMonth();
          }
          if (scope.data.preMonth) {
            scope.preMonth();
          }
        }
      }, true);
      let date = new Date();
      const today = (moment().month()) + 1; // 今天的月份
      const tyear = moment().year(); // 今天的年份
      const startDate = moment(date).startOf('month').startOf('w').format();
      const endDate = moment(date).endOf('month').endOf('w').format();
      scope.month = [];
      scope.months = [];
      scope.showDate = (sdate) => {
        const startTime = moment(sdate).startOf('month').format();
        const endTime = moment(sdate).endOf('month').format();
        // 获取到该月日历显示的第一天和最后一天的日期
        // 通过改日期去服务端获取对应的考勤数据
        // 服务端的数据格式
        console.log(startTime);
        console.log(endTime);
      };
      scope.preMonth = () => {
        let bool = false; // 是不是未来
        let tmonth = false; // 是不是当前月
        date = moment(date).subtract(1, 'month').format();
        const year = moment(date).year(); // 当前时间的年份
        const mon = (moment(date).month()) + 1;
        const prestartDate = moment(date).startOf('month').startOf('w').format();
        const preendDate = moment(date).endOf('month').endOf('w').format();

        if ((mon > today && year === tyear) || year > tyear) {
          bool = true;
        }
        if (mon === today && year === tyear) {
          tmonth = true;
        }

        showCalendar(date, bool, tmonth);
        getAttendances(prestartDate, preendDate);
        scope.showDate(date);
      };
      scope.tMonth = () => {
        date = new Date();
        showCalendar(date, 'tmonth', true);
        getAttendances(startDate, endDate);
        scope.showDate(date);
      };
      scope.nextMonth = () => {
        let tmonth = false;
        let bool = true;
        date = moment(date).add(1, 'month').format();
        const year = moment(date).year(); // 当前时间的年份
        const mon = (moment(date).month()) + 1;
        const nextstartDate = moment(date).startOf('month').startOf('w').format();
        const nextendDate = moment(date).endOf('month').endOf('w').format();

        if ((mon < today && year === tyear) || year < tyear) {
          bool = false;
        }
        if (mon === today && year === tyear) {
          tmonth = true;
        }
        showCalendar(date, bool, tmonth);
        getAttendances(nextstartDate, nextendDate);
        scope.showDate(date);
      };
      showCalendar(date, 'tmonth', true);
      getAttendances(startDate, endDate);
      scope.showDate(date);

      function showCalendar(tdate, future, tmonth) {
        scope.today = tdate;
        scope.firstDay = moment(scope.today).startOf('month').startOf('w').date(); // 这个月第一周的第一天是几号
        scope.endDay = moment(scope.today).endOf('month').endOf('w').date(); // 这个月最后一周的最后一天是几号
        scope.monthDay = moment(scope.today).endOf('month').date(); // 这个月一共有几天
        scope.preEndDay = moment(moment(scope.today).subtract(1, 'month').format()).endOf('month').date(); // 上个月一共有几天
        scope.day = scope.firstDay; // 这个月第一周的第一天的日期
        scope.nextDay = 1; // 下个月的日期
        scope.day2 = 1; // 当月的日期
        let key = 0;
        scope.month = [];
        scope.months = [];
        // 此处用for 收集三段时间，一个是当月的日期，一个是上个月的日期，一个是下个月的日期
        for (let j = 1; j < 4; j++) {
          if (scope.day <= scope.preEndDay) {
            // 计算当月第一周包含上个月的日期
            // 如果当月的第一周的第一天的号数小于或等于上个月最后一天的号数
            // 每个月的第一天从1开始，如果大于1就有包含上个月的日期
            if (scope.day === 1) {
              // 如果单月的第一周的第一天的号数等于1，则不用计算第一周有包含上一个月的天数
              scope.day = scope.preEndDay + 1;
            } else {
              // 计算包含上个月号数的第一周
              for (scope.day; scope.day <= scope.preEndDay;) {
                let isfuture = future;
                if (future === 'tmonth' || tmonth === true) {
                  isfuture = false;
                }
                scope.month.push({
                  day: scope.day,
                  isToday: false,
                  isfuture,
                  otherMonth: true,
                  key
                });
                scope.day += 1;
                key++;
              }
            }
          } else {
            if (scope.day2 > scope.endDay) {
              // 收集当前月的日期后，收集该月包含下个月的日期
              if (scope.endDay < 7) {
                // 当月最后一天小于7，则有包含下个月的日期
                // 计算包含下个月号数的最后一周
                for (scope.nextDay; scope.nextDay <= scope.endDay;) {
                  let isfuture = future;
                  if (future === 'tmonth' || tmonth === true) {
                    isfuture = true;
                  }
                  scope.month.push({
                    day: scope.nextDay,
                    isToday: false,
                    isfuture,
                    otherMonth: true,
                    key
                  });
                  scope.nextDay += 1;
                  key++;
                }
              }
            } else {
              // 循环收集当前月的日期
              for (let i = 1; i <= scope.monthDay; i++) {
                let isToday = false;
                let isfuture = future;
                if (i < moment(scope.today).date() && (future === 'tmonth' || tmonth === true)) {
                  isfuture = false;
                }
                if (i > moment(scope.today).date() && (future === 'tmonth' || tmonth === true)) {
                  isfuture = true;
                }
                if (i === moment(scope.today).date() && tmonth === true) {
                  isToday = true;
                }
                scope.month.push({
                  day: scope.day2,
                  isToday,
                  isfuture,
                  otherMonth: false,
                  key
                });
                scope.day2 += 1;
                key++;
              }
            }
          }
        }
      }
      //  获取考勤记录
      function getAttendances() {
        if (scope.months !== []) {
          scope.months = [];
        }
        scope.item = [];
        for (let i = 0; i < 35; i++) {
          const obj = {
            checking: {
              checkin_at: moment().format(),
              checkout_at: moment().format()
            },
            workday: {
              is_workday: true
            },
            time_of_late: 0,
            time_of_early_leave: 0,
            is_absent_from_work: undefined,
            leaves: []
          };
          if ((i % 7) === 1) {
            obj.time_of_late = 5;
            obj.leaves.push({ leave_type: '事假' });
          }
          if ((i % 7) === 2) {
            obj.time_of_early_leave = 5;
          }
          if ((i % 7) === 3) {
            obj.is_absent_from_work = true;
          }
          if (i === 0 || (i % 7) === 6 || (i % 7) === 0) {
            obj.workday.is_workday = false;
          }
          scope.item.push(obj);
        }
        for (let i = 0; i < scope.item.length; i++) {
          if (scope.item[i].checking != null) {
            scope.item[i].checking.checkin_at = scope.item[i].checking.checkin_at == null ?
              '' : (scope.item[i].checking.checkin_at).substring(11, 16);
            scope.item[i].checking.checkout_at = scope.item[i].checking.checkout_at == null ?
              '' : (scope.item[i].checking.checkout_at).substring(11, 16);
          }

          for (const item in scope.month) {
            if (scope.month[item].key === i) {
              scope.month[item].attendances = scope.item[i];
            }
          }
        }

        // 拆分得到的日期
        let k = 0;
        for (let i = 1; i <= scope.month.length / 7; i++) {
          const week = [];
          for (let j = 0; j < 7; j++) {
            week.push(scope.month[k]);
            k++;
          }
          scope.months.push({ week });
        }
        scope.data.nextMonth = false;
        scope.data.tMonth = false;
        scope.data.preMonth = false;
      }
    }
  };
}

