package com.acat.membertracking.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val LightColors = lightColorScheme(
    primary = AcatBlue,
    secondary = AcatLightBlue,
    background = AcatBackground
)

private val DarkColors = darkColorScheme(
    primary = AcatLightBlue,
    secondary = AcatBlue
)

@Composable
fun ACATMemberTrackingTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colors = if (darkTheme) {
        DarkColors
    } else {
        LightColors
    }

    MaterialTheme(
        colorScheme = colors,
        typography = Typography,
        content = content
    )
}