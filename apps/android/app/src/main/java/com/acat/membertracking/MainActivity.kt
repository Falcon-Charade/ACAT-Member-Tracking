package com.acat.membertracking

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.acat.membertracking.navigation.AppNavHost
import com.acat.membertracking.ui.theme.ACATMemberTrackingTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            ACATMemberTrackingTheme {
                AppNavHost()
            }
        }
    }
}