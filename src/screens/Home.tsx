import React, { Suspense, useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  graphql,
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay";
import { OperationType } from "relay-runtime";
import Navigation from "screens/navigation/Root";

const HomePhotosQuery = graphql`
  query HomeQuery {
    photosList {
      photoId
      createdAt
    }
  }
`;

export default function Home({
  navigation
}): JSX.Element {
  return (
    <>
      <Button
        title="Take a Photo"
        onPress={() => {
          navigation.navigate("Take a Photo", {});
        }}
      />

      <Text style={[styles.title, styles.paddingTop]}>Previous Photos</Text>
      <PhotosList
        navigation={navigation}
      />
    </>
  );
}

function PhotosList({
  navigation
}): JSX.Element {
  const [queryReference, loadQuery] = useQueryLoader(HomePhotosQuery);
  useEffect(() => loadQuery({}), [loadQuery]);
  return queryReference ? (
    <Suspense fallback={<ActivityIndicator />}>
      <PhotosListContent
        navigation={navigation}
        queryReference={queryReference}
      />
    </Suspense>
  ) : (
    <ActivityIndicator />
  );
}

function PhotosListContent({
  queryReference,
  navigation,
}: {
  queryReference: PreloadedQuery<OperationType, Record<string, unknown>>;
}): JSX.Element {
  const data = usePreloadedQuery(HomePhotosQuery, queryReference);
  let [selectedIds, setSelectedIds] = useState(new Set());
  let [refresh, setRefresh] = useState(false);

  const renderItem = ({ item }) => {
    const backgroundColor = selectedIds.has(item.photoId) ? "#2196F3" : "lightblue";
    const color = selectedIds.has(item.photoId) ? "white" : "black";

    const onPress = () => {
      if(selectedIds.has(item.photoId)) {
        selectedIds.delete(item.photoId);
      } else {
        selectedIds.add(item.photoId);
      }

      setSelectedIds(selectedIds);
      setRefresh(!refresh);
    }

    return (
      <PhotosListItem
        item={item}
        onPress={onPress}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    )
  }

  return (
    <>
      <FlatList
        data={data.photosList}
        renderItem={renderItem}
        keyExtractor={(item) => item.photoId}
        extraData={refresh}
      />
      <ViewButton
        navigation={navigation}
        selectedIds={selectedIds}
      />
    </>
  );
}

function ViewButton({navigation, selectedIds}): JSX.Element {
  return selectedIds.size > 0 ? (
    <Button
      title="View Photos"
      onPress={() => {
        navigation.navigate("View Photos", {
          name: 'Jane',
          selectedIds: selectedIds,
        })
      }}
    />
  ) : (
    <></>
  )
}

function PhotosListItem({item, onPress, backgroundColor, textColor}): JSX.Element {
  return (
    <TouchableOpacity
      key={item.photoId}
      onPress={onPress}
      style={[ styles.item, backgroundColor ]}
      >
      <Text
        style={[ textColor ]}
      >
        {new Date(parseInt(item.createdAt)).toLocaleString()}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paddingTop: {
    paddingTop: 10,
  },
  paddingBottom: {
    paddingBottom: 10,
  },
  item: {
    margin: 4,
    padding: 4,
  },
});
