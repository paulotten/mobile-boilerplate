import React, { Suspense, useEffect } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from "react-relay";
import { OperationType } from "relay-runtime";

const ViewPhotosQuery = graphql`
  query ViewPhotosQuery($photoIds: [String!]!) {
    photos(photoIds: $photoIds) {
      photoId
      createdAt
      photoData
    }
  }
`;

export default function ViewPhotos({route}): JSX.Element {
  const selectedIds = Array.from(route.params.selectedIds);

  const [queryReference, loadQuery] = useQueryLoader(ViewPhotosQuery);
  useEffect(() => loadQuery({photoIds: selectedIds}), [loadQuery]);

  return queryReference ? (
    <Suspense fallback={<ActivityIndicator />}>
      <ViewPhotosContent
        queryReference={queryReference}
      />
    </Suspense>
  ) : (
    <ActivityIndicator />
  );
}

function ViewPhotosContent({
  queryReference,
}: {
  queryReference: PreloadedQuery<OperationType, Record<string, unknown>>;
}): JSX.Element {
  const data = usePreloadedQuery(ViewPhotosQuery, queryReference);
  //console.log(data);

  // <Text>[image:{photoData}]</Text>
  const Item = ({ title, photoData }) => (
    <View>
      <Text>{title}</Text>
      <Image
        source={{uri: `data:image/jpeg;base64,${photoData}`}}
        style={styles.image}
      />
    </View>
  );
  const renderItem = ({ item }) => (
    <Item
      title={new Date(parseInt(item.createdAt)).toLocaleString()}
      photoData={item.photoData}
    />
  );

  return (
    <FlatList
      data={data.photos}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
  },
});
