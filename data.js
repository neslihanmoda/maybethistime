/* Sample editorial content data for AFTERIMAGE */
const SITE = {
  title: 'AFTERIMAGE',
  year: new Date().getFullYear()
};

const ARTICLES = [
  {
    id: 'we-were-never-meant-to-be-still',
    category: 'Fashion',
    title: 'WE WERE NEVER MEANT TO BE STILL',
    subtitle: 'On identity, movement, and the images we leave behind.',
    author: 'Lena Harcourt',
    date: '2026-10-01',
    minutes: 6,
    cover: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=8c7b7cf1d3f2f6f6d2b8c2aa5e1a1cf5',
    images: [
      {src:'https://images.unsplash.com/photo-1549207834-6e215efb8a9b?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4df5f4bb2f9b9b7fde1b0c6b1f3f5d1a', caption:'Dress by M.K., styling by A. Ruiz', credit:'Photo: E. James'}
    ],
    body: [
      {type:'p',text:'The photographs in this feature were shot in motion: not a slow portrait but a register of becoming. The subject is always negotiating what remains after a gesture — the afterimage of a look, a borrowed silhouette, a lost refrain.'},
      {type:'sub',text:'Frames of Becoming'},
      {type:'p',text:'Movement here is not simply movement of the body; it is a cultural currency. Clothes, gestures and images circulate, and the traces they leave are the material of identity.'},
      {type:'quote',text:'We archive the gestures we can’t keep.'},
      {type:'p',text:'Styling was minimal; the focus is on texture and edge. Each image is allowed to sit in the frame with an almost unforgiving stillness, which paradoxically emphasizes the motion that created it.'}
    ],
    tags:['editorial','fashion','photography']
  },
  {
    id: 'kuma-atelier-portrait',
    category: 'Art',
    title: 'KUMA: STITCHING A NEW STUDY OF FORM',
    subtitle: 'A studio portrait series exploring tactile practice and the slow hand.',
    author: 'Owen Park',
    date: '2026-09-19',
    minutes: 8,
    cover: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=1b2c3d4e5f6a7b8c9d0e',
    images:[
      {src:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&s=aaaa1111bbbb2222', caption:'Makings in the studio', credit:'Photo: K. Ivers'}
    ],
    body:[
      {type:'p',text:'There is a taxonomy to the hand: stitch, press, trim. KUMA’s work asks what intensive making does to attention.'},
      {type:'p',text:'The images gathered here are less about apparel and more about the sediments of a practice: spools, threads, and the negative space a seam creates.'}
    ],
    tags:['studio','making','textiles']
  },
  {
    id:'dressing-for-a-life-that-doesnt-exist-yet',
    category:'Culture',
    title:'Dressing for a Life That Doesn’t Exist Yet',
    subtitle:'On hope, futurity, and the clothes we make for imagined selves.',
    author:'Maya Lin',
    date:'2026-08-07',
    minutes:5,
    cover:'https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&s=bbbb3333cccc4444',
    images:[],
    body:[
      {type:'p',text:'To dress for a future self is to allocate optimism into fabric. You sew a little possibility into every seam.'},
      {type:'quote',text:'Fashion can be a rehearsal for what you want to become.'}
    ],
    tags:['essay','fashion','future']
  }
];

// categories list
const CATEGORIES = ['Fashion','Art','Culture','People','Film','Beauty','Opinion'];

export { SITE, ARTICLES, CATEGORIES };
