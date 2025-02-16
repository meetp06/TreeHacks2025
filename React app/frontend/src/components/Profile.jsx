import { useState, useEffect } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  // Sample data for development
  const sampleData = {
    "name": "Emily Nelson",
    "email": "emily.n@hotmail.com",
    "dob": "2020-12-07",
    "address": "Pasadena, California",
    "profile_image_url": "https://example.com/profile-image.jpg",
    "bio": "Lorem Ipsum Dolor Sit Amet, Consectetur Adipi Scing Elit. Tortor Turpis Sodales Nulla Velit. Nunc Cum Vitae, Rhoncus Leo Id. Volutpat Duis Tinunt Pretium Luctus Pulvinar Pretium.",
    "medical_condition": "Lorem Ipsum Dolor Sit Amet, Consectetur Adipi Scing Elit.",
    "emergency_contact": "666-666-6666",
    "phone": "626-398-6547"
  };

  useEffect(() => {
    // Commented out API integration
    // const fetchProfileData = async () => {
    //   try {
    //     const response = await fetch('/profile');
    //     const data = await response.json();
    //     setProfileData(data);
    //   } catch (error) {
    //     console.error('Error fetching profile data:', error);
    //   }
    // };
    // fetchProfileData();

    // Using static data for now
    setProfileData(sampleData);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      color: '#6c757d',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        border: '1px solid #e9ecef',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Profile Header */}
        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          borderBottom: '1px solid #e9ecef',
          flexWrap: 'wrap',
          boxSizing: 'border-box',
          justifyContent: 'center'
        }}>
          {/* Profile Image */}
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: '#f8f9fa',
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src={profileData.profile_image_url}
              alt={profileData.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Profile Info */}
          <div style={{ 
            flex: '1',
            minWidth: '250px',
            textAlign: 'center'
          }}>
            <h2 style={{
              color: '#2c3e50',
              marginBottom: '15px',
              fontSize: '1.8em',
              fontWeight: '500'
            }}>
              {profileData.name}
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: '8px', wordBreak: 'break-word' }}>
                <strong style={{ color: '#6c757d' }}>Email: </strong>
                {profileData.email}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#6c757d' }}>Date of Birth: </strong>
                {formatDate(profileData.dob)}
              </div>
              <div style={{ wordBreak: 'break-word' }}>
                <strong style={{ color: '#6c757d' }}>Address: </strong>
                {profileData.address}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div style={{ 
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{
              color: '#2c3e50',
              marginBottom: '15px',
              fontSize: '1.1em',
              fontWeight: '500'
            }}>
              BIO
            </h3>
            <p style={{
              lineHeight: '1.6',
              color: '#6c757d',
              margin: 0,
              wordBreak: 'break-word'
            }}>
              {profileData.bio}
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{
              color: '#2c3e50',
              marginBottom: '15px',
              fontSize: '1.1em',
              fontWeight: '500'
            }}>
              MEDICAL CONDITION
            </h3>
            <p style={{
              lineHeight: '1.6',
              color: '#6c757d',
              margin: 0,
              wordBreak: 'break-word'
            }}>
              {profileData.medical_condition}
            </p>
          </section>

          <section>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <h3 style={{
                  color: '#2c3e50',
                  marginBottom: '10px',
                  fontSize: '1.1em',
                  fontWeight: '500'
                }}>
                  EMERGENCY
                </h3>
                <p style={{
                  color: '#6c757d',
                  margin: 0,
                  fontSize: '1em',
                  wordBreak: 'break-word'
                }}>
                  {profileData.emergency_contact}
                </p>
              </div>
              <div>
                <h3 style={{
                  color: '#2c3e50',
                  marginBottom: '10px',
                  fontSize: '1.1em',
                  fontWeight: '500'
                }}>
                  PHONE
                </h3>
                <p style={{
                  color: '#6c757d',
                  margin: 0,
                  fontSize: '1em',
                  wordBreak: 'break-word'
                }}>
                  {profileData.phone}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
