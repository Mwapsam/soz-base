module ApplicationHelper
    def default_meta_tags
        {
          site: 'stonesofzimbabwe.com',
          title: 'Stones of Zimbabwe',
          reverse: true,
          separator: '|',
          description: 'Headquartered in Harare with support from Berlin and London, Stones of Zimbabwe is passionate about promoting the work of some of the finest Zimbabwean sculptors. By hosting exhibitions around the world and offering sculptures for sale online, we let you experience some of the finest contemporary stone sculptures. As part of our mission, we give relief to people living in the worst distress and hardship lives so that they may have the opportunity to develop and live fulfilling and worthwhile lives.',
          keywords: 'Zimbabwean sculptors, Contemporary stone sculptures, Sculpture exhibitions, Sculptures for sale online, Relief for people in distress, Hardship lives, Mission of promoting Zimbabwean art, Headquartered in Harare, Support from Berlin and London',
          canonical: request.original_url,
          noindex: !Rails.env.production?,
          icon: [
            { href: image_url('soz.ico') },
            { href: image_url('logo.png'), rel: 'apple-touch-icon', sizes: '180x180', type: 'image/jpg' },
          ],
          og: {
            site_name: 'stonesofzimbabwe.com',
            title: 'Stones of Zimbabwe',
            description: 'Headquartered in Harare with support from Berlin and London, Stones of Zimbabwe is passionate about promoting the work of some of the finest Zimbabwean sculptors. By hosting exhibitions around the world and offering sculptures for sale online, we let you experience some of the finest contemporary stone sculptures. As part of our mission, we give relief to people living in the worst distress and hardship lives so that they may have the opportunity to develop and live fulfilling and worthwhile lives.', 
            type: 'website',
            url: request.original_url,
            image: image_url('logo.png')
          }
        }
    end
end