package com.rtnmyasyncstorage

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.coroutineScope
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.rtnmyasyncstorage.NativeMyAsyncStorageSpec
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch

class MyAsyncStorageModule(context: ReactApplicationContext?): NativeMyAsyncStorageSpec(context) {

    private val Context.userPreferencesDataStore: DataStore<Preferences> by preferencesDataStore(
        name = "user"
    )
    private val lifecycle: Lifecycle by lazy {
        ((context as ReactContext).currentActivity as AppCompatActivity).lifecycle
    }

    override fun getName(): String {
        return NAME
    }

    companion object {
        const val NAME = "RTNMyAsyncStorage"
    }

    override fun saveToIOS(key: String?, text: String?) {
    }

    override fun getFromIOS(key: String?): String {
        return ""
    }

    override fun saveToAndroid(key: String?, text: String?, promise: Promise?) {
        lifecycle.coroutineScope.launch {
            key?.let { text?.let { it1 -> saveData(it, it1) } }

        }
    }

    override fun getFromAndroid(key: String?, promise: Promise?) {
        lifecycle.coroutineScope.launch {
            val data = key?.let { getData(it) }
            if (data != null) {
                promise?.resolve(data)
            } else {
                promise?.reject("Error", "Value is null")
            }
        }
    }

    suspend fun saveData(key: String, text: String) {
        currentActivity?.userPreferencesDataStore?.edit { preferences ->
            preferences[stringPreferencesKey(key)] = text
        }
    }

    suspend fun getData(key: String): Any? {
        val value = currentActivity?.userPreferencesDataStore?.data
            ?.map {
                it[stringPreferencesKey(key)]
            }
        return value?.firstOrNull()
    }
}