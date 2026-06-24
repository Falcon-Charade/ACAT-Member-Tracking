package com.acat.membertracking.navigation

sealed class Routes(val path: String) {
    data object SignIn : Routes("sign-in")
    data object MemberList : Routes("members")
    data object MemberDetail : Routes("members/{memberId}") {
        fun create(memberId: String): String = "members/$memberId"
    }
}