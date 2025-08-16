// lib/queries.js
export const TEAM_LIST = `
*[_type=="fighter_card" && !(_id in path("drafts.**"))]
| order(id asc){
  _id, id, name, role,
  image{
    asset->{url, metadata{ lqip, dimensions{width,height} }},
    alt
  }
}
`;

export const FIGHTER_BY_ID = `
*[_type=="fighter_card" && _id==$id][0]{
  _id, id, name, role, stance, style, age, weight, record, bio, accomplishments,
  image{asset->{url, metadata{lqip}}},
  gallery[]{asset->{url, metadata{lqip}}}
}
`;
