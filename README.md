# Graylog-scrolling-widgets-via-tampermonkey
You can use this userscript for Tampermonkey for rotation widgets on Graylog Dashboard.

See more in Example file.

# How to install
Create a new Tampermonkey script and place the contents of the file "Graylog_scrolling_widgets.js" there.

You should replace some strings:

		// @match        http://GRAYLOG-DASHBOARD-URL/*
Enter your Graylog server URL here.

		ROTATION_TIME = 60; //sec
Replace the value "60" with the value you want.

# Additionally
Also you can use this userscript with [Graylog-dashboards-rotator-via-tampermonkey](https://github.com/vshovkuta/Graylog-dashboards-rotator-via-tampermonkey) together. In this case, you should enter the same "ROTATION_TIME" value. 
