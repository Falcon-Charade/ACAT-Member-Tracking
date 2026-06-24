package com.acat.membertracking.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.acat.membertracking.data.placeholder.PlaceholderMember
import com.acat.membertracking.data.placeholder.PlaceholderMembers

@Composable
fun MemberListScreen(
    onMemberClicked: (String) -> Unit,
    onBackToSignIn: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(
                text = "Members",
                style = MaterialTheme.typography.headlineMedium
            )

            Spacer(modifier = Modifier.weight(1f))

            Button(
                onClick = onBackToSignIn
            ) {
                Text("Sign out")
            }
        }

        Text(
            modifier = Modifier.padding(top = 8.dp, bottom = 16.dp),
            text = "Placeholder member list. Later this will be loaded from the API.",
            style = MaterialTheme.typography.bodyMedium
        )

        LazyColumn {
            items(PlaceholderMembers.members) { member ->
                MemberListItem(
                    member = member,
                    onClick = {
                        onMemberClicked(member.id)
                    }
                )
            }
        }
    }
}

@Composable
private fun MemberListItem(
    member: PlaceholderMember,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 12.dp)
            .clickable(onClick = onClick),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = member.name,
                style = MaterialTheme.typography.titleMedium
            )

            Row(
                modifier = Modifier.padding(top = 8.dp)
            ) {
                AssistChip(
                    onClick = {},
                    label = {
                        Text(member.role)
                    }
                )

                AssistChip(
                    modifier = Modifier.padding(start = 8.dp),
                    onClick = {},
                    label = {
                        Text(member.stage)
                    }
                )
            }
        }
    }
}