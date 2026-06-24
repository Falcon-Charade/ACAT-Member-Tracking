package com.acat.membertracking.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun SignInScreen(
    onContinueAsViewer: () -> Unit,
    onSignInClicked: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "ACAT Member Tracking",
            style = MaterialTheme.typography.headlineMedium
        )

        Text(
            modifier = Modifier.padding(top = 8.dp, bottom = 32.dp),
            text = "Sign in to manage members, or continue as a read-only viewer.",
            style = MaterialTheme.typography.bodyMedium
        )

        Button(
            onClick = onSignInClicked
        ) {
            Text("Sign in with Google")
        }

        OutlinedButton(
            modifier = Modifier.padding(top = 12.dp),
            onClick = onContinueAsViewer
        ) {
            Text("Continue as viewer")
        }
    }
}