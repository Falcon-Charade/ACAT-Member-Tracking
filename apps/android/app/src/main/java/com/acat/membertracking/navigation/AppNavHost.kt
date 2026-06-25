package com.acat.membertracking.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.acat.membertracking.ui.screens.MemberDetailScreen
import com.acat.membertracking.ui.screens.MemberListScreen
import com.acat.membertracking.ui.screens.SignInScreen

@Composable
fun AppNavHost() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Routes.SignIn.path
    ) {
        composable(Routes.SignIn.path) {
            SignInScreen(
                onContinueAsViewer = {
                    navController.navigate(Routes.MemberList.path) {
                        popUpTo(Routes.SignIn.path) {
                            inclusive = true
                        }
                    }
                },
                onSignInClicked = {
                    navController.navigate(Routes.MemberList.path) {
                        popUpTo(Routes.SignIn.path) {
                            inclusive = true
                        }
                    }
                }
            )
        }

        composable(Routes.MemberList.path) {
            MemberListScreen(
                onMemberClicked = { memberId ->
                    navController.navigate(Routes.MemberDetail.create(memberId))
                },
                onBackToSignIn = {
                    navController.navigate(Routes.SignIn.path) {
                        popUpTo(Routes.MemberList.path) {
                            inclusive = true
                        }
                    }
                }
            )
        }

        composable(
            route = Routes.MemberDetail.path,
            arguments = listOf(
                navArgument("memberId") {
                    type = NavType.StringType
                }
            )
        ) { backStackEntry ->
            val memberId = backStackEntry.arguments?.getString("memberId").orEmpty()

            MemberDetailScreen(
                memberId = memberId,
                onBack = {
                    navController.popBackStack()
                }
            )
        }
    }
}