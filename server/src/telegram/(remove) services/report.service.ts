// export interface IReportItem {
//   category: string
//   sum: number
// }
//
// export interface IReport {
//   data: IReportItem[]
//   total: number
// }

// export interface IReportDates {
//   prev: Dayjs
//   next: Dayjs
//   curr: Dayjs
//   period: {
//     start: Dayjs
//     end: Dayjs
//   }
// }

// import { Dayjs } from 'dayjs'
// import { IInlineKeyboard, IReport, IReportDates, OperationType } from '../../shared/interfaces'
//
// export const getReportByCategoriesReplyMessage = (type: OperationType, report: IReport | undefined, date: Dayjs): string => {
//   const formatDate = date.format('MM.YYYY')
//   if (!report) {
//     return `Няма аперацый за ${formatDate}`
//   }
//   const headerTemplate = `<b>${type === 'expense' ? 'Выдаткі' : 'Даходы'} за ${formatDate}</b> \n`
//   const reportTemplate = report.data.reduce(
//     (prev, curr) => prev + `<pre>${curr.category}: ${curr.sum}</pre>\n`, ``
//   )
//   const totalSumTemplate = `<b>Агульная сума: ${report.total}</b>\n`
//
//   return `` +
//     `<pre>------------------------------</pre>\n` +
//     `${headerTemplate}` +
//     `<pre>------------------------------</pre>\n` +
//     `${reportTemplate}` +
//     `<pre>------------------------------</pre>\n` +
//     `${totalSumTemplate}` +
//     `<pre>------------------------------</pre>`
// }
//
// export const getReportDates = (date: Dayjs): IReportDates => {
//   return {
//     prev: date.subtract(1, 'month'),
//     next: date.add(1, 'month'),
//     curr: date,
//     period: {
//       start: date.startOf('month'),
//       end: date.endOf('month')
//     }
//   }
// }
//
// export const getReportKeyboard = (type: OperationType, dates: IReportDates): IInlineKeyboard[] => {
//   const typeButtonText = `${type === 'expense' ? 'Даходы' : 'Выдаткі'}`
//   const typeButtonCallback = `${type === 'expense' ? 'income' : 'expense'}`
//   return [
//     { text: '<<<', callback_data: `report ${dates.prev.format()} ${type}` },
//     { text: typeButtonText, callback_data: `report ${dates.curr.format()} ${typeButtonCallback}` },
//     { text: '>>>', callback_data: `report ${dates.next.format()} ${type}` }
//   ]
// }


// will use it only in web_app (remove)
// export const getReportByCategories = async (
//   userId: Types.ObjectId,
//   type: OperationType,
//   period: { start: Dayjs, end: Dayjs }
// ): Promise<Aggregate<IReport> | undefined> => {
//   const report = await OperationModel.aggregate([
//     { $match: { user: userId, type, createdAt: { $gte: period.start.toDate(), $lte: period.end.toDate() } } },
//     { $group: { _id: '$category', sum: { $sum: '$sum' } } },
//     { $project: { _id: 0, category: '$_id', sum: { $sum: { $round: ['$sum', 2] } } } },
//     { $sort: { sum: -1 } },
//     { $group: { _id: null, data: { $push: '$$ROOT' }, total: { $sum: { $round: ['$sum', 2] } } } },
//     { $project: { _id: 0, data: '$data', total: { $round: ['$total', 2] } } }
//   ])
//   return report[0]
// }

// bot.command('report', async ctx => {
//   const { id: chatId } = ctx.chat
//   const user = await UserModel.findOne({ chatId }, { _id: 1, categories: 1 })
//
//   const date = dayjs()
//   const type = 'expense'
//   const reportDates = getReportDates(date)
//
//   const report = await getReportByCategories(user!._id, type, reportDates.period)
//   const message = getReportByCategoriesReplyMessage(type, report, date)
//   const keyboard = getReportKeyboard(type, reportDates)
//
//   return ctx.replyWithHTML(message, Markup.inlineKeyboard([keyboard]))
// })

// bot.action(/^report/, async ctx => {
//   const { id: chatId } = ctx.chat!
//   const user = await UserModel.findOne({ chatId }, { _id: 1, categories: 1 })
//   const date = dayjs(ctx.match.input.split(' ')[1])
//   const type = ctx.match.input.split(' ')[2] as OperationType
//
//   const reportDates = getReportDates(date)
//   const report = await getReportByCategories(user!._id, type, reportDates.period)
//   const message = getReportByCategoriesReplyMessage(type, report, date)
//   const keyboard = getReportKeyboard(type, reportDates)
//
//   await ctx.deleteMessage()
//   return ctx.replyWithHTML(message, Markup.inlineKeyboard([keyboard]))
// })
