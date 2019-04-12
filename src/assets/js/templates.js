const itemTemplate = `
<div class="anime-item pure-u-1 pure-u-md-1-4">
    <div class="l-box">
        <div class="float-right">
            <ion-icon name="trash" class="editor-trigger" data-micromodal-trigger="editor-%ID%"></ion-icon>
            <ion-icon name="create" class="editor-trigger" data-micromodal-trigger="editor-%ID%"></ion-icon>
        </div>
        <div class="pure-g">
            <b class="pure-u-1">Title</b>
            <p class="pure-u-1">%TITLE%</p>
            <b class="pure-u-1">Day</b>
            <p class="pure-u-1">%DAY%</p>
            <b class="pure-u-1">Latest watched</b>
            <p class="pure-u-1-5"><ion-icon name="remove" ></ion-icon></p>
            <p class="pure-u-1-5">%LATEST%</p>
            <p class="pure-u-1-5"><ion-icon name="add" ></ion-icon></p>
        </div>
    </div>
</div>
<div id="editor-%ID%" class="modal micromodal-slide" aria-hidden="true">
    <div class="modal_overlay" tabindex="-1" data-micromodal-close>
        <div class="modal_container pure-u-1" role="dialog" aria-modal="true" aria-labelledby="modal-%ID%-title">
            <header class="modal_header">
                <h2 id="modal-%ID%-title">Edit info</h2>
                <button class="modal_close" aria-label="Close" data-micromodal-close></button>
            </header>
            <main class="modal_content" id="modal-%ID%-content">
                <form id="%ID%-form" class="pure-form pure-form-aligned">
                    <fieldset>
                        <div class="pure-control-group">
                            <label for="%ID%-title">Title</label>
                            <input id="%ID%-title" type="text" value="%TITLE%" readonly />
                        </div>
                        <div class="pure-control-group">
                            <label for="%ID%-short">Short-Form</label>
                            <input id="%ID%-short" type="checkbox" %SHORT% />
                        </div>
                        <div class="pure-control-group">
                            <label for="%ID%-startdate">Start Date</label>
                            <input id="%ID%-startdate" type="date" value="%STARTDATE%" />
                        </div>
                        <div class="pure-control-group">
                            <label for="%ID%-day">Release Day</label>
                            <select>
                                <option value=""></option>
                                <option value="Sunday" %SUNDAY%>Sunday</option>
                                <option value="Monday" %MONDAY%>Monday</option>
                                <option value="Tuesday" %TUESDAY%>Tuesday</option>
                                <option value="Wednesday" %WEDNESDAY%>Wednesday</option>
                                <option value="Thursday" %THURSDAY%>Thursday</option>
                                <option value="Friday" %FRIDAY%>Friday</option>
                                <option value="Saturday" %SATURDAY%>Saturday</option>
                            </select>
                        </div>
                        <div class="pure-control-group">
                            <label for="%ID%-channel">Channel</label>
                            <input id="%ID%-channel" type="text" value="%CHANNEL%" />
                        </div>
                        <div class="pure-control-group">
                            <label for="%ID%-latest">Latest Watched</label>
                            <input id="%ID%-latest" type="number" value="%LATEST%" />
                        </div>
                        <div class="pure-control-group">
                            <label for="%ID%-op">OP</label>
                            <input id="%ID%-op" type="checkbox" %OP% />
                        </div>
                        <div class="pure-control-group">
                            <label for="%ID%-ed">ED</label>
                            <input id="%ID%-ed" type="checkbox" %ED% />
                        </div>
                        <div class="pure-control-group">
                            <label for="%ID%-bd">BD</label>
                            <input id="%ID%-bd" type="checkbox" %BD% />
                        </div>

                        <div class="pure-controls">
                            <button class="pure-button" aria-label="Close" data-micromodal-close>Close</button>
                            <input type="button" class="pure-button pure-button-primary" value="Submit" />
                        </div>
                    </fieldset>
                    <input type="hidden" id="" value="" />

                </form>
            </main>
        </div>
    </div>
</div>
`;

const addTitleItem = `
<div class="add-title-item pure-u-1 pure-u-md-1-4">
    <div class="l-box" data-micromodal-trigger="editor-new-item">
        <div class="pure-g">
            <ion-icon name="add" class="pure-u-1"></ion-icon>
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
                <form id="new-title-form" class="pure-form pure-form-aligned">
                    <fieldset>
                        <div class="pure-control-group">
                            <label for="new-title">Title</label>
                            <input id="new-title" type="text" />
                        </div>
                        <div class="pure-control-group">
                            <label for="new-short">Short-Form</label>
                            <input id="new-short" type="checkbox" />
                        </div>
                        <div class="pure-control-group">
                            <label for="new-startdate">Start Date</label>
                            <input id="new-startdate" type="date" />
                        </div>
                        <div class="pure-control-group">
                            <label for="new-day">Release Day</label>
                            <select>
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
                            <input id="new-channel" type="text" />
                        </div>
                        <div class="pure-control-group">
                            <label for="new-latest">Latest Watched</label>
                            <input id="new-latest" type="number" />
                        </div>
                        <div class="pure-control-group">
                            <label for="new-op">OP</label>
                            <input id="new-op" type="checkbox" />
                        </div>
                        <div class="pure-control-group">
                            <label for="new-ed">ED</label>
                            <input id="new-ed" type="checkbox" />
                        </div>
                        <div class="pure-control-group">
                            <label for="new-bd">BD</label>
                            <input id="new-bd" type="checkbox" />
                        </div>

                        <div class="pure-controls">
                            <button class="pure-button" aria-label="Close" data-micromodal-close>Close</button>
                            <input type="button" class="pure-button pure-button-primary" value="Submit" />
                        </div>
                    </fieldset>
                    <input type="hidden" id="" value="" />

                </form>
            </main>
        </div>
    </div>
</div>
`;

const replacements = {
    "%ID%": "",
    "%TITLE%": "",
    "%DAY%": "",
    "%LATEST%": "",
    "%STARTDATE%": "",
    "%CHANNEL%": "",
    "%SHORT%": "",
    "%OP%": "",
    "%ED%": "",
    "%BD%": ""
};

const navItems = {
    "%SEASON%": "",
    "%LINK%": ""
};

const menuTemplate = '<li class="pure-menu-item"><a href="%LINK%" class="pure-menu-link">%SEASON%</a></li>';

function replaceTemplate(data) {
    return itemTemplate.replace(/%\w+%/g, function(all) {
        return data[all] || all;
    });
}