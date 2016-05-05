// Tab Panels
$(document).ready(function(){
	// grab all container panel DIVs
	var tabContainers = $('div.tabs > div');
	// hide them all, then show the first one
	tabContainers.hide().filter(':first').show();

	// -----Shake bottom tabs on hover-----
	// -----Shake is animated through css, jQuery controls adding and removing class allowing for animation to replay-----
	$('.bottom-tab').mouseover(function() {
		$(this).children('a').addClass('shake');
	}) .mouseout(function() {
		$(this).children('a').removeClass('shake');
	});
	// ----------

	// set the first tab to class="selected"
	$('div.tabs ul.tabNavigation a:first').addClass('selected');
	// add onclick handlers to all tabs
	$('div.tabs ul.tabNavigation a').click(function(){

		// -----Animate top padding removal when tab is not selected-----
		$('div.tabs ul.tabNavigation a').animate({paddingTop: '10px'}, "fast");
		// -----

		// -----Animate extra top padding for selected tab-----
		$(this).animate({paddingTop: '20px'}, "fast");
		// ----------

		// hide all tabContainers
		tabContainers.hide();
		// show only the tabContainer with the ID that matches the href for the A that was clicked
		//alert(this.hash);
		tabContainers.filter(this.hash).show();
		// remove class="selected" from all tabs
		$('div.tabs ul.tabNavigation a').removeClass('selected');
		// set class="selected" on the tab that was just clicked
		$(this).addClass('selected');
		// stop following links
		return false;
	});

	// Bookmark link functionality
	// https://www.thewebflash.com/how-to-add-a-cross-browser-add-to-favorites-bookmark-button-to-your-website/
	// BY HENDY TARNANDO, DECEMBER 30, 2014
	jQuery(document).ready(function($) {
		$('.bottom-tab2').click(function(e) {
			var bookmarkURL = window.location.href;
			var bookmarkTitle = document.title;

			if ('addToHomescreen' in window && window.addToHomescreen.isCompatible) {
				// Mobile browsers
				addToHomescreen({ autostart: false, startDelay: 0 }).show(true);
			} else if (window.sidebar && window.sidebar.addPanel) {
				// Firefox version < 23
				window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
			} else if ((window.sidebar && /Firefox/i.test(navigator.userAgent)) || (window.opera && window.print)) {
				// Firefox version >= 23 and Opera Hotlist
				$(this).attr({
					href: bookmarkURL,
					title: bookmarkTitle,
					rel: 'sidebar'
				}).off(e);
				return true;
			} else if (window.external && ('AddFavorite' in window.external)) {
				// IE Favorite
				window.external.AddFavorite(bookmarkURL, bookmarkTitle);
			} else {
				// Other browsers (mainly WebKit - Chrome/Safari)
				alert('Press ' + (/Mac/i.test(navigator.userAgent) ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
			}
			return false;
		});
	});
});