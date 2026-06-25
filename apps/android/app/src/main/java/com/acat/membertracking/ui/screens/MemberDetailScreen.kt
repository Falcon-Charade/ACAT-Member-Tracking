package com.acat.membertracking.ui.screens

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.acat.membertracking.data.placeholder.PlaceholderMembers

@Composable
fun MemberDetailScreen(
    memberId: String,
    onBack: () -> Unit
) {
    val member = PlaceholderMembers.findById(memberId)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Button(
            onClick = onBack
        ) {
            Text("Back")
        }

        Text(
            modifier = Modifier.padding(top = 24.dp),
            text = member?.name ?: "Unknown member",
            style = MaterialTheme.typography.headlineMedium
        )

        Text(
            modifier = Modifier.padding(top = 8.dp),
            text = "Member ID: $memberId",
            style = MaterialTheme.typography.bodyMedium
        )

        HorizontalDivider(
            modifier = Modifier.padding(vertical = 16.dp)
        )

        if (member == null) {
            Text(
                text = "No placeholder member exists for this ID.",
                style = MaterialTheme.typography.bodyMedium
            )
        } else {
            Text(
                text = "Role: ${member.role}",
                style = MaterialTheme.typography.bodyLarge
            )

            Text(
                modifier = Modifier.padding(top = 8.dp),
                text = "Stage: ${member.stage}",
                style = MaterialTheme.typography.bodyLarge
            )

            Text(
                modifier = Modifier.padding(top = 24.dp),
                text = "Later this screen will show full member details from the backend API.",
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}