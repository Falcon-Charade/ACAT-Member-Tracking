package com.acat.membertracking.navigation

sealed class Routes(val path: String) {
    object SignIn : Routes("sign-in")
    object MemberList : Routes("members")
    object MemberDetail : Routes("members/{memberId}") {
        fun create(memberId: String): String = "members/$memberId"
    }
}