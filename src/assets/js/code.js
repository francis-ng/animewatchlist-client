$(document).ready(() => {
    //getData('SapphireFlame', 'Autumn 2018');
    itemDataReceived(
        {
            "Items":[
                {"ed":"False","op":"False","bd":"True","season":"Autumn 2018","startDate":"2018-10-05","user":"SapphireFlame","channel":"Ohys","watchDay":"Friday","latestWatched":"5","isShort":"True","title":"Zombieland Saga"},
                {"ed":"false","op":"false","bd":"true","season":"Autumn 2018","startDate":"2018-10-01","user":"SapphireFlame","channel":"Ohys","watchDay":"","latestWatched":"5","isShort":"false","title":"Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai"},
                {"ed":"False","op":"False","bd":"True","season":"Autumn 2018","startDate":"2018-10-05","user":"SapphireFlame","channel":"Ohys","watchDay":"Friday","latestWatched":"5","isShort":"True","title":"Zombieland Saga"},
                {"ed":"false","op":"false","bd":"true","season":"Autumn 2018","startDate":"2018-10-01","user":"SapphireFlame","channel":"Ohys","watchDay":"","latestWatched":"5","isShort":"false","title":"Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai"},
                {"ed":"False","op":"False","bd":"True","season":"Autumn 2018","startDate":"2018-10-05","user":"SapphireFlame","channel":"Ohys","watchDay":"Friday","latestWatched":"5","isShort":"True","title":"Zombieland Saga"},
                {"ed":"false","op":"false","bd":"true","season":"Autumn 2018","startDate":"2018-10-01","user":"SapphireFlame","channel":"Ohys","watchDay":"","latestWatched":"5","isShort":"false","title":"Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai"}
            ],
            "Count":2,
            "ScannedCount":2
        }
    );
});

function prepareItemHtml(data) {
    var replacement = {...replacements};
    replacement['%ID%'] = data.title.replace(' ', '-').toLowerCase();
    replacement['%TITLE%'] = data.title;
    replacement['%DAY%'] = data.watchDay ? data.watchDay : '';
    replacement['%LATEST%'] = data.latestWatched ? data.latestWatched : '';
    replacement['%STARTDATE%'] = data.startDate ? data.startDate : '';
    replacement['%CHANNEL%'] = data.channel ? data.channel : '';
    replacement['%SHORT%'] = data.isShort.toUpperCase() === 'TRUE' ? 'checked' : '';
    replacement['%OP%'] = data.op.toUpperCase() === 'TRUE' ? 'checked' : '';
    replacement['%ED%'] = data.ed.toUpperCase() === 'TRUE' ? 'checked' : '';
    replacement['%BD%'] = data.bd.toUpperCase() === 'TRUE' ? 'checked' : '';

    replacement['%SUNDAY%'] = data.watchDay.toUpperCase() === 'SUNDAY' ? 'selected' : '';
    replacement['%MONDAY%'] = data.watchDay.toUpperCase() === 'MONDAY' ? 'selected' : '';
    replacement['%TUESDAY%'] = data.watchDay.toUpperCase() === 'TUESDAY' ? 'selected' : '';
    replacement['%WEDNESDAY%'] = data.watchDay.toUpperCase() === 'WEDNESDAY' ? 'selected' : '';
    replacement['%THURSDAY%'] = data.watchDay.toUpperCase() === 'THURSDAY' ? 'selected' : '';
    replacement['%FRIDAY%'] = data.watchDay.toUpperCase() === 'FRIDAY' ? 'selected' : '';
    replacement['%SATURDAY%'] = data.watchDay.toUpperCase() === 'SATURDAY' ? 'selected' : '';

    return replaceTemplate(replacement);
}

// {"Items":[{"ed":"False","op":"False","bd":"True","season":"Autumn 2018","startDate":"2018-10-05","user":"SapphireFlame","group":"Ohys","watchDay":"Friday","latestWatched":"5","isShort":"False","title":"Zombieland Saga"},{"ed":"false","op":"false","bd":"true","season":"Autumn 2018","startDate":"2018-10-01","user":"SapphireFlame","group":"Ohys","watchDay":"Monday","latestWatched":"5","isShort":"false","title":"Seishun Buta Yarou"}],"Count":2,"ScannedCount":2}
function getData(user, season) {
    $.ajax({
        type: 'POST',
        url: '/watchtitle/get',
        contentType: 'application/json',
        data: JSON.stringify({ user: user, season: season }),
        dataType: 'json'
    })
    .done(itemDataReceived);
}

function itemDataReceived(data) {
    let html = '';
    for (ind in data.Items) {
        let itemHtml = prepareItemHtml(data.Items[ind]);
        html += itemHtml;
    }
    html += addTitleItem;
    $('#item-container').html(html);
    MicroModal.init();
}