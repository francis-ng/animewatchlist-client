<template>
  <div>
    <div v-for="(item, index) in watchItems" class="anime-item pure-u-1 pure-u-md-1-4">
      <div class="l-box">
        <div class="pure-g">
          <b class="pure-u-1">Title</b>
          <span class="pure-u-1">{{ item.title }}</span>
          <br/>
          <b class="pure-u-1">Day</b>
          <span class="pure-u-1">{{ item.watchDay }}</span>
          <br/>
          <b class="pure-u-1">Last watched</b>
          <span class="pure-u-1">{{ item.latestWatched }}</span>
        </div>
        <section class="title-controls pure-g">
          <div class="pure-u-1-4">
            <button class="pure-button" aria-label="Decrement episodes" @click="quickEditTitle(index, -1)"><ion-icon name="remove"></ion-icon></button>
          </div>
          <div class="pure-u-1-2">
            <button class="pure-button pure-button-primary" aria-label="Edit title" data-micromodal-trigger="item-editor" @click="populateEditor(index)"><ion-icon name="create"></ion-icon></button>
          </div>
          <div class="pure-u-1-4">
            <button class="pure-button" aria-label="Increment episodes" @click="quickEditTitle(index, 1)"><ion-icon name="add"></ion-icon></button>
          </div>
        </section>
      </div>
    </div>

    <div id="item-editor" class="modal micromodal-slide" aria-hidden="true">
      <div class="modal_overlay" tabindex="-1" data-micromodal-close>
        <div
          class="modal_container pure-u-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="editor-label-title"
        >
          <header class="modal_header">
            <h2 id="editor-label-title">Edit info</h2>
            <button class="modal_close" aria-label="Close" data-micromodal-close></button>
          </header>
          <main class="modal_content">
            <form
              class="pure-form pure-form-aligned"
              @submit.prevent="updateTitle"
            >
              <fieldset>
                <div class="pure-control-group">
                  <label for="editor-data-title">Title</label>
                  <input id="editor-data-title" type="text" ref="editor_data_title" readonly>
                </div>
                <div class="pure-control-group">
                  <label for="editor-data-short">Short-Form</label>
                  <input id="editor-data-short" type="checkbox" ref="editor_data_short">
                </div>
                <div class="pure-control-group">
                  <label for="editor-data-startdate">Start Date</label>
                  <input id="editor-data-startdate" type="date" ref="editor_data_startdate">
                </div>
                <div class="pure-control-group">
                  <label>Watch Day</label>
                  <select ref="editor_data_watchday">
                    <option value></option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
                <div class="pure-control-group">
                  <label for="editor-data-channel">Channel</label>
                  <input id="editor-data-channel" type="text" ref="editor_data_channel">
                </div>
                <div class="pure-control-group">
                  <label for="editor-data-latest">Latest Watched</label>
                  <input id="editor-data-latest" type="number" ref="editor_data_latest">
                </div>
                <div class="pure-control-group">
                  <label for="editor-data-op">OP</label>
                  <input id="editor-data-op" type="checkbox" ref="editor_data_op">
                </div>
                <div class="pure-control-group">
                  <label for="editor-data-ed">ED</label>
                  <input id="editor-data-ed" type="checkbox" ref="editor_data_ed">
                </div>
                <div class="pure-control-group">
                  <label for="editor-data-bd">BD</label>
                  <input id="editor-data-bd" type="checkbox" ref="editor_data_bd">
                </div>

                <div class="pure-g">
                  <button class="pure-button pure-u-1-4" aria-label="Close" data-micromodal-close>Close</button>
                  <button
                    type="submit"
                    class="pure-button pure-button-primary pure-u-5-8"
                  >Submit</button>
                  <button class="pure-button pure-u-1-8 button-danger" aria-label="Delete" @click="deleteTitle()"><ion-icon name="trash"></ion-icon></button>
                </div>
              </fieldset>
            </form>
          </main>
        </div>
      </div>
    </div>

    <div id="editor-new-item" class="modal micromodal-slide" aria-hidden="true">
      <div class="modal_overlay" tabindex="-1" data-micromodal-close>
        <div class="modal_container pure-u-1" role="dialog" aria-modal="true" aria-labelledby="modal-new-title">
          <header class="modal_header">
              <h2 id="modal-new-title">Add Title</h2>
              <button class="modal_close" aria-label="Close" data-micromodal-close></button>
          </header>
          <main class="modal_content">
            <form
              class="pure-form pure-form-aligned"
              @submit.prevent="addTitle"
            >
              <fieldset>
                <div class="pure-control-group">
                  <label for="new-title">Title</label>
                  <input id="new-title" type="text" ref="new_data_title" required />
                </div>
                <div class="pure-control-group">
                  <label for="new-short">Short-Form</label>
                  <input id="new-short" type="checkbox" ref="new_data_short" />
                </div>
                <div class="pure-control-group">
                  <label for="new-startdate">Start Date</label>
                  <input id="new-startdate" type="date" ref="new_data_startdate" />
                </div>
                <div class="pure-control-group">
                  <label for="new-day">Release Day</label>
                  <select ref="new_data_watchday">
                    <option value=""></option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
                <div class="pure-control-group">
                  <label for="new-channel">Channel</label>
                  <input id="new-channel" type="text" ref="new_data_channel" />
                </div>
                <div class="pure-control-group">
                  <label for="new-latest">Latest Watched</label>
                  <input id="new-latest" type="number" ref="new_data_latest" />
                </div>
                <div class="pure-control-group">
                  <label for="new-op">OP</label>
                  <input id="new-op" type="checkbox" ref="new_data_op" />
                </div>
                <div class="pure-control-group">
                  <label for="new-ed">ED</label>
                  <input id="new-ed" type="checkbox" ref="new_data_ed" />
                </div>
                <div class="pure-control-group">
                  <label for="new-bd">BD</label>
                  <input id="new-bd" type="checkbox" ref="new_data_bd" />
                </div>

                <div class="pure-controls">
                  <button class="pure-button" aria-label="Close" data-micromodal-close>Close</button>
                  <button
                    type="submit"
                    class="pure-button pure-button-primary"
                  >Submit</button>
                </div>
              </fieldset>
            </form>
          </main>
        </div>
      </div>
    </div>

    <div id="editor-new-season" class="modal micromodal-slide" aria-hidden="true">
      <div class="modal_overlay" tabindex="-1" data-micromodal-close>
        <div class="modal_container pure-u-1" role="dialog" aria-modal="true" aria-labelledby="modal-new-season">
          <header class="modal_header">
              <h2 id="modal-new-season">Add Season</h2>
              <button class="modal_close" aria-label="Close" data-micromodal-close></button>
          </header>
          <main class="modal_content">
            <form
              class="pure-form pure-form-aligned"
              @submit.prevent="addSeason"
            >
              <fieldset>
                <div class="pure-control-group">
                  <label for="new-season">Season</label>
                  <input id="new-season" type="text" ref="new_data_season" required />
                </div>

                <div class="pure-controls">
                  <button class="pure-button" aria-label="Close" data-micromodal-close>Close</button>
                  <button
                    type="submit"
                    class="pure-button pure-button-primary"
                  >Submit</button>
                </div>
              </fieldset>
            </form>
          </main>
        </div>
      </div>
    </div>

    <section class="add-controls pure-g">
      <div class="pure-u-1 pure-u-md-1-2">
        <button class="pure-button button-secondary" aria-label="Add Season" data-micromodal-trigger="editor-new-season">Add Season</button>
      </div>
      <div class="pure-u-1 pure-u-md-1-2">
        <button class="pure-button pure-button-primary" aria-label="Add Title" data-micromodal-trigger="editor-new-item">Add Title</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import MicroModal from 'micromodal'

export default {
  data () {
    return {
      watchItems: []
    }
  },
  dependencies: ['getWatchListService', 'addSeasonService'],
  methods: {
    getWatchData (user, season) {
      const path = `https://sphr-animewatchlist.herokuapp.com/watchtitle/get`
      this.$refs.season = season
      this.$refs.username = user
      let request = {
        user: user,
        season: season
      }

      axios
        .post(path, request)
        .then(response => {
          response.data.Items.forEach(element => {
            element.op = element.op.toUpperCase() === 'TRUE'
            element.ed = element.ed.toUpperCase() === 'TRUE'
            element.bd = element.bd.toUpperCase() === 'TRUE'
            element.isShort = element.isShort.toUpperCase() === 'TRUE'
          })
          this.watchItems = response.data.Items
        })
        .catch(error => {
          console.log(error)
        })
    },
    populateEditor (index) {
      this.$refs.selectedItem = index
      this.$refs.editor_data_title.value = this.watchItems[index].title
      this.$refs.editor_data_short.checked = this.watchItems[index].isShort
      this.$refs.editor_data_startdate.value = this.watchItems[index].startDate
      this.$refs.editor_data_watchday.value = this.watchItems[index].watchDay
      this.$refs.editor_data_channel.value = this.watchItems[index].channel
      this.$refs.editor_data_latest.value = this.watchItems[index].latestWatched
      this.$refs.editor_data_op.checked = this.watchItems[index].op
      this.$refs.editor_data_ed.checked = this.watchItems[index].ed
      this.$refs.editor_data_bd.checked = this.watchItems[index].bd
    },
    quickEditTitle (index, amount) {
      this.populateEditor(index)
      this.$refs.editor_data_latest.value = parseInt(this.watchItems[index].latestWatched) + amount
      this.updateTitle()
    },
    updateTitle () {
      const path = `https://sphr-animewatchlist.herokuapp.com/watchtitle/update`
      let index = this.$refs.selectedItem
      let data = {
        user: this.$refs.username,
        title: this.$refs.editor_data_title.value,
        season: this.watchItems[index].season,
        startDate: this.$refs.editor_data_startdate.value,
        watchDay: this.$refs.editor_data_watchday.value,
        channel: this.$refs.editor_data_channel.value,
        latestWatched: this.$refs.editor_data_latest.value === '' ? 0 : this.$refs.editor_data_latest.value,
        isShort: this.$refs.editor_data_short.checked ? 'True' : 'False',
        op: this.$refs.editor_data_op.checked ? 'True' : 'False',
        ed: this.$refs.editor_data_ed.checked ? 'True' : 'False',
        bd: this.$refs.editor_data_bd.checked ? 'True' : 'False'
      }

      axios
        .post(path, data)
        .then(response => {
          console.log(response)
          if (response.data.result === 'Success') {
            this.watchItems[index].startDate = data.startDate
            this.watchItems[index].watchDay = data.watchDay
            this.watchItems[index].channel = data.channel
            this.watchItems[index].latestWatched = data.latestWatched
            this.watchItems[index].op = data.op.toUpperCase() === 'TRUE'
            this.watchItems[index].ed = data.ed.toUpperCase() === 'TRUE'
            this.watchItems[index].bd = data.bd.toUpperCase() === 'TRUE'
            this.watchItems[index].isShort = data.isShort.toUpperCase() === 'TRUE'
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTitle () {
      const path = `https://sphr-animewatchlist.herokuapp.com/watchtitle/add`
      let data = {
        user: this.$refs.username,
        title: this.$refs.new_data_title.value,
        season: this.$refs.season,
        startDate: this.$refs.new_data_startdate.value,
        watchDay: this.$refs.new_data_watchday.value,
        channel: this.$refs.new_data_channel.value,
        latestWatched: this.$refs.new_data_latest.value === '' ? 0 : this.$refs.new_data_latest.value,
        isShort: this.$refs.new_data_short.checked ? 'True' : 'False',
        op: this.$refs.new_data_op.checked ? 'True' : 'False',
        ed: this.$refs.new_data_ed.checked ? 'True' : 'False',
        bd: this.$refs.new_data_bd.checked ? 'True' : 'False'
      }

      axios
        .post(path, data)
        .then(response => {
          console.log(response)
          if (response.data.result === 'Success') {
            this.clearNewTitleForm()

            data.op = data.op.toUpperCase() === 'TRUE'
            data.ed = data.ed.toUpperCase() === 'TRUE'
            data.bd = data.bd.toUpperCase() === 'TRUE'
            data.isShort = data.isShort.toUpperCase() === 'TRUE'
            this.watchItems.push(data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteTitle () {
      const path = `https://sphr-animewatchlist.herokuapp.com/watchtitle/delete`
      let index = this.$refs.selectedItem
      let request = {
        user: this.$refs.username,
        season: this.watchItems[index].season,
        title: this.watchItems[index].title
      }

      axios
        .post(path, request)
        .then(response => {
          console.log(response)
          if (response.data.result === 'Success') {
            this.watchItems.splice(index, 1)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    addSeason () {
      this.addSeasonService.addSeason(this.$refs.new_data_season.value)
      this.$refs.new_data_season.value = ''
    },
    clearNewTitleForm () {
      this.$refs.new_data_title.value = ''
      this.$refs.new_data_startdate.value = ''
      this.$refs.new_data_watchday.value = ''
      this.$refs.new_data_channel.value = ''
      this.$refs.new_data_latest.value = ''
      this.$refs.new_data_short.checked = false
      this.$refs.new_data_op.checked = false
      this.$refs.new_data_ed.checked = false
      this.$refs.new_data_bd.checked = false
    }
  },
  created () {
    this.getWatchListService.getWatchList = this.getWatchData
  },
  updated () {
    this.$nextTick(() => {
      MicroModal.init()
    })
  },
  mounted () {
    this.$nextTick(() => {
      MicroModal.init()
    })
  }
}
</script>
