package com.acat.membertracking.data.placeholder

data class PlaceholderMember(
    val id: String,
    val name: String,
    val role: String,
    val stage: String
)

object PlaceholderMembers {
    val members = listOf(
        PlaceholderMember(
            id = "1",
            name = "Alex Carter",
            role = "Applicant",
            stage = "Probation"
        ),
        PlaceholderMember(
            id = "2",
            name = "Sam Taylor",
            role = "New Member",
            stage = "Probation"
        ),
        PlaceholderMember(
            id = "3",
            name = "Jordan Lee",
            role = "Member",
            stage = "Complete"
        )
    )

    fun findById(id: String): PlaceholderMember? {
        return members.firstOrNull { it.id == id }
    }
}