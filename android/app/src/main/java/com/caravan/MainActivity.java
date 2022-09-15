package com.caravan;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import android.content.Context;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.os.Bundle;
import android.telephony.TelephonyManager;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "caravan";
    }

    /**
     * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
     * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
     * (Paper).
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new MainActivityDelegate(this, getMainComponentName());
    }

    public class MainActivityDelegate extends ReactActivityDelegate {
        public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
            super(activity, mainComponentName);
        }

        @Override
        protected ReactRootView createRootView() {
            ReactRootView reactRootView = new ReactRootView(getContext());
            // If you opted-in for the New Architecture, we enable the Fabric Renderer.
            reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
            return reactRootView;
        }

        @Override
        protected boolean isConcurrentRootEnabled() {
            // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
            // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
            return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            handleOrientationConfiguration();
        }

        private void handleOrientationConfiguration() {

            if (isTablet()) {
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
            } else {
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
            }
        }

        private boolean isTablet() {
            Configuration configuration = this.getContext().getResources()
                    .getConfiguration();/*from   www .j ava  2  s. c  o  m*/
            return (configuration.screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) >= Configuration.SCREENLAYOUT_SIZE_LARGE;
        }
    }
}
