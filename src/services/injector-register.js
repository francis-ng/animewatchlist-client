import injector from 'vue-inject'

import GetWatchListService from '@/services/getWatchList.service'
import AddSeasonService from '@/services/addSeason.service'

injector.service('getWatchListService', function () {
  return GetWatchListService
})
injector.service('addSeasonService', function () {
  return AddSeasonService
})
