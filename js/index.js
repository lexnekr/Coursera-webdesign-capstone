Share = {
    /**
     * Ïîêàçàòü ïîëüçîâàòåëþ äèëîã øàðèíãà â ñîîâåòñòâèè ñ îïöèÿìè
     * Ìåòîä äëÿ èñïîëüçîâàíèÿ â inline-js â ññûëêàõ
     * Ïðè áëîêèðîâêå âñïëûâàþùåãî îêíà ïîäñòàâèò íóæíûé àäðåñ è ïîëçâîëèò áðàóçåðó ïåðåéòè ïî íåìó
     *
     * @example <a href="" onclick="return share.go(this)">like+</a>
     *
     * @param Object _element - ýëåìåíò DOM, äëÿ êîòîðîãî
     * @param Object _options - îïöèè, âñå íåîáÿçàòåëüíû
     */
    go: function(_element, _options) {
        var
            self = Share,
            options = $.extend(
                {
                    type:       'vk',    // òèï ñîöñåòè
                    url:        location.href,  // êàêóþ ññûëêó øàðèì
                    count_url:  location.href,  // äëÿ êàêîé ññûëêè êðóòèì ñ÷¸ò÷èê
                    title:      document.title, // çàãîëîâîê øàðèíãà
                    image:        '',             // êàðòèíêà øàðèíãà
                    text:       '',             // òåêñò øàðèíãà
                },
                $(_element).data(), // Åñëè ïàðàìåòðû çàäàíû â data, òî ÷èòàåì èõ
                _options            // Ïàðàìåòðû èç âûçîâà ìåòîäà èìåþò íàèâûñøèé ïðèîðèòåò
            );

        if (self.popup(link = self[options.type](options)) === null) {
            // Åñëè íå óäàëîñü îòêðûòü ïîïàï
            if ( $(_element).is('a') ) {
                // Åñëè ýòî <a>, òî ïîäñòàâëÿåì àäðåñ è ïðîñèì áðàóçåð ïðîäîëæèòü ïåðåõîä ïî ññûëêå
                $(_element).prop('href', link);
                return true;
            }
            else {
                // Åñëè ýòî íå <a>, òî ïûòàåìñÿ ïåðåéòè ïî àäðåñó
                location.href = link;
                return false;
            }
        }
        else {
            // Ïîïàï óñïåøíî îòêðûò, ïðîñèì áðàóçåð íå ïðîäîëæàòü îáðàáîòêó
            return false;
        }
    },

    // ÂÊîíòàêòå
    vk: function(_options) {
        var options = $.extend({
                url:    location.href,
                title:  document.title,
                image:  '',
                text:   '',
            }, _options);

        return 'http://vkontakte.ru/share.php?'
            + 'url='          + encodeURIComponent(options.url)
            + '&title='       + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&image='       + encodeURIComponent(options.image)
            + '&noparse=true';
    },

    // Îäíîêëàññíèêè
    ok: function(_options) {
        var options = $.extend({
                url:    location.href,
                text:   '',
            }, _options);

        return 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1'
            + '&st.comments=' + encodeURIComponent(options.text)
            + '&st._surl='    + encodeURIComponent(options.url);
    },

    // Facebook
    fb: function(_options) {
        var options = $.extend({
                url:    location.href,
                title:  document.title,
                image:  '',
                text:   '',
            }, _options);

        return 'http://www.facebook.com/sharer.php?s=100'
            + '&p[title]='     + encodeURIComponent(options.title)
            + '&p[summary]='   + encodeURIComponent(options.text)
            + '&p[url]='       + encodeURIComponent(options.url)
            + '&p[images][0]=' + encodeURIComponent(options.image);
    },

    // Æèâîé Æóðíàë
    lj: function(_options) {
        var options = $.extend({
                url:    location.href,
                title:  document.title,
                text:   '',
            }, _options);

        return 'http://livejournal.com/update.bml?'
            + 'subject='        + encodeURIComponent(options.title)
            + '&event='         + encodeURIComponent(options.text + '<br/><a href="' + options.url + '">' + options.title + '</a>')
            + '&transform=1';
    },

    // Òâèòòåð
    tw: function(_options) {
        var options = $.extend({
                url:        location.href,
                count_url:  location.href,
                title:      document.title,
            }, _options);

        return 'http://twitter.com/share?'
            + 'text='      + encodeURIComponent(options.title)
            + '&url='      + encodeURIComponent(options.url)
            + '&counturl=' + encodeURIComponent(options.count_url);
    },

    // Mail.Ru
    mr: function(_options) {
        var options = $.extend({
                url:    location.href,
                title:  document.title,
                image:  '',
                text:   '',
            }, _options);

        return 'http://connect.mail.ru/share?'
            + 'url='          + encodeURIComponent(options.url)
            + '&title='       + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&imageurl='    + encodeURIComponent(options.image);
    },
// Google+
	gg: function (_options) {
		var options = $.extend({
			url: location.href			
		}, _options);

		return 'https://plus.google.com/share?url='
			+ encodeURIComponent(options.url);
	},

    // Îòêðûòü îêíî øàðèíãà
    popup: function(url) {
        return window.open(url,'','toolbar=0,status=0,scrollbars=1,width=626,height=436');
    }
}

// Âñå ýëåìåíòû êëàññà .social_share ñ÷èòàåì êíîïêàìè øàðèíãà
$(document).on('click', '.social_share', function(){
    Share.go(this);
});